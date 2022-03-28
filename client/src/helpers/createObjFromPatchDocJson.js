const createObjFromPatchDocJson = (patchDoc) => {
    const result = { };

    console.log(patchDoc)

    patchDoc.forEach(operation => {
        result[operation["path"].substring(1)] = operation["value"];
    });

    return result;
};

export default createObjFromPatchDocJson;