using AutoMapper;
using BeerCatalog.Application.Models.Beer;
using BeerCatalog.Domain.Models.Beer;
using BeerCatalog.Domain.Models.Ingredients;
using BeerCatalog.Domain.Models.Method;

namespace BeerCatalog.Application.MappingProfiles;

public class BeerProfile : Profile
{
    public BeerProfile()
    {
        CreateMap<Beer, FavoriteBeerDto>();
        CreateMap<Beer, BeerReadDto>()
            .ForMember(b => b.FoodPairing, opt =>
                opt.MapFrom(c => c.Foods.Select(f => f.Name)))
            .ForMember(b => b.Method, opt =>
                opt.MapFrom(c => new Method
                {
                    Twist = c.Twist == null ? null : c.Twist.Name,
                    MashTemp = c.MashTemps.Select(mt => new MashTempReadDto
                    {
                        Duration = mt.Duration,
                        Temp = new Temp
                        {
                            Unit = "celsius",
                            Value = mt.Value
                        }
                    }),
                    Fermentation = new FermentationReadDto
                    {
                        Temp = new Temp
                        {
                            Unit = "celsius",
                            Value = c.Fermentation.Value
                        }
                    }
                }))
            .ForMember(b => b.Ingredients, opt => 
                opt.MapFrom(c => new Ingredients
                {
                    Yeast = c.Yeast.Name,
                    Malt = c.MaltIngredients.Select(mi => new MaltReadDto
                    {
                        Name = mi.Malt.Name,
                        Amount = new Amount
                        {
                            Unit = "kilograms",
                            Value = mi.Value
                        }
                    }),
                    Hops = c.HopIngredients.Select(hi => new HopReadDto
                    {
                        Name  = hi.Hop.Name,
                        Amount = new Amount
                        {
                            Unit = "grams",
                            Value = hi.Value
                        },
                        Add = hi.WhenToAdd.Value,
                        Attribute = hi.Attribute.Value
                    })
                }));
        CreateMap<Beer, BeerWithFavoriteMarkDto>()
            .ForMember(b => b.FoodPairing, opt =>
                opt.MapFrom(c => c.Foods.Select(f => f.Name)))
            .ForMember(b => b.Method, opt =>
                opt.MapFrom(c => new Method
                {
                    Twist = c.Twist == null ? null : c.Twist.Name,
                    MashTemp = c.MashTemps.Select(mt => new MashTempReadDto
                    {
                        Duration = mt.Duration,
                        Temp = new Temp
                        {
                            Unit = "celsius",
                            Value = mt.Value
                        }
                    }),
                    Fermentation = new FermentationReadDto
                    {
                        Temp = new Temp
                        {
                            Unit = "celsius",
                            Value = c.Fermentation.Value
                        }
                    }
                }))
            .ForMember(b => b.Ingredients, opt => 
                opt.MapFrom(c => new Ingredients
                {
                    Yeast = c.Yeast.Name,
                    Malt = c.MaltIngredients.Select(mi => new MaltReadDto
                    {
                        Name = mi.Malt.Name,
                        Amount = new Amount
                        {
                            Unit = "kilograms",
                            Value = mi.Value
                        }
                    }),
                    Hops = c.HopIngredients.Select(hi => new HopReadDto
                    {
                        Name  = hi.Hop.Name,
                        Amount = new Amount
                        {
                            Unit = "grams",
                            Value = hi.Value
                        },
                        Add = hi.WhenToAdd.Value,
                        Attribute = hi.Attribute.Value
                    })
                }));
    }
}