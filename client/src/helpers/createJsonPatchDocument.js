const createJsonPatchDocument = (obj) => {
    const entries = Object.entries(obj);

    const patchDoc = [];

    entries.forEach(([key, value]) => {
        patchDoc.push({
            path: `/${key}`,
            value: value,
            op: 'replace'
        })
    });

    return patchDoc;
};

export default createJsonPatchDocument;