const retrieveChangedValues = (values, initialState) => {
    const result = { };
    Object.keys(values).forEach(key => {
        if (values[key] !== initialState[key]) {
            result[key] = values[key];
        }
    });

    return result;
}

export default retrieveChangedValues;