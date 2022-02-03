function actionToCamelCase(actionType) {
    const parts = actionType.split('_');
    parts.splice(-1, 1);

    const modifiedParts = parts.map((part, index) => {
        let newPart = part.toLowerCase();

        if (index !== 0) {
            newPart = newPart.charAt(0).toUpperCase() + newPart.slice(1);
        }

        return newPart;
    });

    return modifiedParts.join('');
}

export default actionToCamelCase;