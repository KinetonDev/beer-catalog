CREATE OR ALTER PROC ParseJsonData(@json NVARCHAR(MAX)) 
AS
BEGIN 
SET NOCOUNT ON;
BEGIN TRANSACTION;
BEGIN TRY  
DECLARE @yeast TABLE (ID UNIQUEIDENTIFIER DEFAULT NEWID(), NAME NVARCHAR(50))

INSERT INTO @yeast (Name)
SELECT * FROM OPENJSON(@json, N'$') WITH (
NAME NVARCHAR(50) N'$.ingredients.yeast'
) AS tableToInsert;

IF (EXISTS (SELECT NAME FROM @yeast WHERE NAME NOT IN (SELECT NAME FROM Ingredients.Yeasts))) 
BEGIN
INSERT INTO Ingredients.Yeasts SELECT * FROM @yeast 
END
ELSE
BEGIN
DECLARE @yeastName NVARCHAR(100);
SELECT @yeastName = NAME FROM @yeast;
DELETE FROM @yeast;
INSERT INTO @yeast SELECT * FROM Ingredients.Yeasts WHERE NAME = @yeastName;
END

DECLARE @beer TABLE (ID UNIQUEIDENTIFIER DEFAULT NEWID(),
Name NVARCHAR(30),
Tagline NVARCHAR(30),
Description NVARCHAR(500),
ImageUrl NVARCHAR(500),
ABV float,
Ibu float,
ebc float,
BrewersTips NVARCHAR(200),
YeastId UNIQUEIDENTIFIER)

INSERT INTO @beer(Name, Tagline, Description, ImageUrl, ABV, Ibu, ebc, BrewersTips) SELECT * FROM OPENJSON(@json, N'$') WITH (
Name NVARCHAR(30) N'$.name',
Tagline NVARCHAR(30) N'$.tagline',
Description NVARCHAR(500) N'$.description',
ImageUrl NVARCHAR(500) N'$.image_url',
Abv float N'$.abv',
Ibu float N'$.ibu',
ebc float N'$.ebc',
BrewersTips NVARCHAR(200) N'$.brewers_tips');

UPDATE @beer SET YeastId = (SELECT Id FROM @yeast)

INSERT INTO Beer.Beers
SELECT * FROM @beer;

DECLARE @beerId UNIQUEIDENTIFIER;
SELECT @beerId = Id FROM @beer;

DECLARE @food TABLE (ID UNIQUEIDENTIFIER DEFAULT NEWID(), Name NVARCHAR(50))

INSERT INTO @food(Name)
SELECT * FROM OPENJSON(@json, N'$.food_pairing') WITH (
Name NVARCHAR(100) N'$'
) AS tableToInsert;

DECLARE @foodId UNIQUEIDENTIFIER
DECLARE @foodName NVARCHAR(100)

DECLARE foodC CURSOR FOR SELECT * FROM @food
OPEN foodC

FETCH NEXT FROM foodC INTO @foodId, @foodName

WHILE @@FETCH_STATUS = 0
   BEGIN
       IF (NOT EXISTS (SELECT * FROM Beer.Food WHERE NAME = @foodName)) 
		BEGIN
			INSERT INTO Beer.Food VALUES(@foodId, @foodName)
		END
	   ELSE
		BEGIN
			SELECT @foodId = Id FROM Beer.Food WHERE NAME = @foodName;
		END
	   INSERT INTO Beer.FoodPairing VALUES(@beerId, @foodId);
	   FETCH NEXT FROM foodC INTO @foodId, @foodName
	END

CLOSE foodC
DEALLOCATE foodC

DECLARE @fermentation TABLE (ID UNIQUEIDENTIFIER DEFAULT NEWID(), Value INT, BeerId UNIQUEIDENTIFIER);

INSERT INTO @fermentation (Value) SELECT * FROM OPENJSON(@json, N'$') WITH (
	VALUE INT N'$.method.fermentation.temp.value'
) AS tableToInsert;

UPDATE @fermentation SET BeerId = @beerId;

INSERT INTO Method.Fermentation SELECT * FROM @fermentation;

DECLARE @mashTemp TABLE (ID UNIQUEIDENTIFIER DEFAULT NEWID(), Value INT, Duration INT, BeerId UNIQUEIDENTIFIER);
INSERT INTO @mashTemp(Value, Duration) SELECT * FROM OPENJSON(@json, N'$.method.mash_temp') WITH
(
VALUE INT N'$.temp.value',
Duration INT N'$.duration'
);
UPDATE @mashTemp SET BeerId = @beerId;
INSERT INTO Method.MashTemp SELECT * FROM @mashTemp;

DECLARE @twist TABLE (ID UNIQUEIDENTIFIER DEFAULT NEWID(), Name NVARCHAR(200), BeerId UNIQUEIDENTIFIER);
INSERT INTO @twist (Name) SELECT * FROM OPENJSON(@json, N'$') WITH (
Name NVARCHAR(200) N'$.method.twist'
);

UPDATE @twist SET BeerId = @beerId;

INSERT INTO Method.Twists SELECT * FROM @twist;

DECLARE @malts TABLE (ID UNIQUEIDENTIFIER DEFAULT NEWID(), Name NVARCHAR(100));
DECLARE @maltIngredients TABLE (BeerId UNIQUEIDENTIFIER, MaltId UNIQUEIDENTIFIER,
Value FLOAT, Id UNIQUEIDENTIFIER DEFAULT NEWID());

INSERT INTO @malts(Name) SELECT * FROM OPENJSON(@json, N'$.ingredients.malt') WITH
(
	NAME NVARCHAR(100) '$.name'
);

INSERT INTO @maltIngredients(Value) SELECT * FROM OPENJSON(@json, N'$.ingredients.malt') WITH
(
	value float '$.amount.value'
);

UPDATE @maltIngredients SET BeerId = @beerId;

DECLARE @maltId UNIQUEIDENTIFIER
DECLARE @maltName NVARCHAR(100)
DECLARE @maltIngBeerId UNIQUEIDENTIFIER
DECLARE @mailtIngMaltId UNIQUEIDENTIFIER
DECLARE @maltIngValue FlOAT
DECLARE @maltIngId UNIQUEIDENTIFIER

DECLARE maltsC CURSOR FOR SELECT * FROM @malts
DECLARE maltsIngC CURSOR FOR SELECT * FROM @maltIngredients
OPEN maltsC
OPEN maltsIngC

FETCH NEXT FROM maltsC INTO @maltId, @maltName
FETCH NEXT FROM maltsIngC INTO @maltIngBeerId, @mailtIngMaltId, @maltIngValue, @maltIngId

WHILE @@FETCH_STATUS = 0
   BEGIN
       IF (NOT EXISTS (SELECT * FROM Ingredients.Malts WHERE NAME = @maltName)) 
		BEGIN
			INSERT INTO Ingredients.Malts VALUES(@maltId, @maltName)
		END
	   ELSE
		BEGIN
			SELECT @maltId = Id FROM Ingredients.Malts WHERE NAME = @maltName;
		END	 
	   INSERT INTO Beer.MaltIngredients VALUES (@maltIngBeerId, @maltId, @maltIngValue, @maltIngId)
		
	   FETCH NEXT FROM maltsC INTO @maltId, @maltName
	   FETCH NEXT FROM maltsIngC INTO @maltIngBeerId, @mailtIngMaltId, @maltIngValue, @maltIngId
	END

CLOSE maltsC
DEALLOCATE maltsC
CLOSE maltsIngC
DEALLOCATE maltsIngC

DECLARE @hop TABLE (Id UNIQUEIDENTIFIER DEFAULT NEWID(), Name NVARCHAR(100));
DECLARE @hopIngredients TABLE (Id UNIQUEIDENTIFIER DEFAULT NEWID(), BeerId UNIQUEIDENTIFIER, 
HopId UNIQUEIDENTIFIER,Value FLOAT, WhenToAdd NVARCHAR(30), HopAttribute NVARCHAR(30));

INSERT INTO @hop(Name) SELECT * FROM OPENJSON(@json, N'$.ingredients.hops') WITH
(
	NAME NVARCHAR(100) '$.name'
);

INSERT INTO @hopIngredients(Value, WhenToAdd, HopAttribute) SELECT * FROM OPENJSON(@json, N'$.ingredients.hops') WITH
(
	Value float '$.amount.value',
	WhenToAdd NVARCHAR(30) '$.add',
	HopAttribute NVARCHAR(30) '$.attribute'
);

UPDATE @hopIngredients SET BeerId = @beerId;

DECLARE @hopId UNIQUEIDENTIFIER
DECLARE @hopName NVARCHAR(100)
DECLARE @hopIngId UNIQUEIDENTIFIER
DECLARE @hopIngBeerId UNIQUEIDENTIFIER
DECLARE @hopIngHopId UNIQUEIDENTIFIER
DECLARE @hopIngValue FLOAT
DECLARE @hopIngWhenToAdd NVARCHAR(30)
DECLARE @hopIngHopAttribute NVARCHAR(30)

DECLARE @whenToAddId INT
DECLARE @hopAttributeId INT

DECLARE hopC CURSOR FOR SELECT * FROM @hop
DECLARE hopIngC CURSOR FOR SELECT * FROM @hopIngredients
OPEN hopC
OPEN hopIngC

FETCH NEXT FROM hopC INTO @hopId, @hopName
FETCH NEXT FROM hopIngC INTO @hopIngId, @hopIngBeerId, 
@hopIngHopId, @hopIngValue, 
@hopIngWhenToAdd, @hopIngHopAttribute

WHILE @@FETCH_STATUS = 0
   BEGIN
       IF (NOT EXISTS (SELECT * FROM Ingredients.Hops WHERE NAME = @hopName)) 
		BEGIN
			INSERT INTO Ingredients.Hops VALUES(@hopId, @hopName)
		END
	   ELSE
		BEGIN
			SELECT @hopId = Id FROM Ingredients.Hops WHERE NAME = @hopName;
		END	 
		SELECT @whenToAddId = Id FROM Ingredients.WhenToAdd WHERE WhenToAdd = @hopIngWhenToAdd
		SELECT @hopAttributeId = Id FROM Ingredients.HopAttribute WHERE HopAttribute = @hopIngHopAttribute

	   INSERT INTO Beer.HopIngredients VALUES (@hopIngId, @hopIngBeerId, @hopId, 
	   @hopIngValue, @whenToAddId, @hopAttributeId);
		
	   FETCH NEXT FROM hopC INTO @hopId, @hopName
		FETCH NEXT FROM hopIngC INTO @hopIngId, @hopIngBeerId, 
		@hopIngHopId, @hopIngValue, 
		@hopIngWhenToAdd, @hopIngHopAttribute
	END

CLOSE hopC
DEALLOCATE hopC
CLOSE hopIngC
DEALLOCATE hopIngC
COMMIT;
END TRY  
BEGIN CATCH  
	 SELECT ERROR_MESSAGE() AS ErrorMessage;  
     ROLLBACK;
END CATCH
SET NOCOUNT OFF;
END
GO
exec ParseJsonData @json = '{"id":2,"name":"Trashy Blonde","tagline":"You Know You Shouldn''t","first_brewed":"04/2008","description":"A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.","image_url":"https://images.punkapi.com/v2/2.png","abv":4.1,"ibu":41.5,"target_fg":1010,"target_og":1041.7,"ebc":15,"srm":15,"ph":4.4,"attenuation_level":76,"volume":{"value":20,"unit":"litres"},"boil_volume":{"value":25,"unit":"litres"},"method":{"mash_temp":[{"temp":{"value":69,"unit":"celsius"},"duration":15}],"fermentation":{"temp":{"value":18,"unit":"celsius"}},"twist":"Default Twist"},"ingredients":{"malt":[{"name":"Maris Otter Extra Pale","amount":{"value":3.25,"unit":"kilograms"}},{"name":"Caramalt","amount":{"value":0.2,"unit":"kilograms"}},{"name":"Munich","amount":{"value":0.4,"unit":"kilograms"}}],"hops":[{"name":"Amarillo","amount":{"value":13.8,"unit":"grams"},"add":"start","attribute":"bitter"},{"name":"Simcoe","amount":{"value":13.8,"unit":"grams"},"add":"start","attribute":"bitter"},{"name":"Amarillo","amount":{"value":26.3,"unit":"grams"},"add":"end","attribute":"flavour"},{"name":"Motueka","amount":{"value":18.8,"unit":"grams"},"add":"end","attribute":"flavour"}],"yeast":"Wyeast 1056 - American Ale™"},"food_pairing":["Fresh crab with lemon","Garlic butter dipping sauce","Goats cheese salad","Creamy lemon bar doused in powdered sugar"],"brewers_tips":"Be careful not to collect too much wort from the mash. Once the sugars are all washed out there are some very unpleasant grainy tasting compounds that can be extracted into the wort.","contributed_by":"Sam Mason <samjbmason>"}'