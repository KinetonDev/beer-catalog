import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useStyle from './styles'
import {POST} from "../../../helpers/HTTPMethods";
import {
    Autocomplete,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {Formik} from "formik";
import {countriesList} from "../../Common/countries";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {selectUpdatingFlags} from "../../../redux/selectors";
import {useDispatch, useSelector} from "react-redux";
import {clearFlags} from "../../../redux/actions/actions";
import validationSchema from "./validationSchema";
import {FormattedMessage, injectIntl} from "react-intl";

function showIcon(isUpdating, updateSucceeded, wasUpdateRequested) {
    if (isUpdating) return (<CircularProgress/>);
    if (wasUpdateRequested && !isUpdating) return updateSucceeded ? (<CheckIcon color={"success"} sx={{
        width: "25px",
        height: "25px",
    }}/>) : (<CloseIcon color={"error"} sx={{
        width: "25px",
        height: "25px",
    }}/>);
    return null;
}

function areFieldsChanged(values, initialState) {
    let result = false;

    Object.keys(values).forEach(key => {
        if (result) return;

        if (values[key] !== initialState[key]) {
            result = true;
        }
    });

    return result;
}

function hasErrors(errors) {
    console.log(!!Object.values(errors).length)
    return !!Object.values(errors).length;
}

const ProfileInfo = (
    {
        isEditing,
        handleSave,
        initialFormState,
        handleCancel,
        intl
    }) => {
    const classes = useStyle();
    const updatingFlags = useSelector(state => selectUpdatingFlags(state));
    const dispatch = useDispatch();

    const firstNameLabel = intl.formatMessage({
        id: "profile.firstName",
        defaultMessage: "First name",
        description: "First name label"
    });
    const lastNameLabel = intl.formatMessage({
        id: "profile.lastName",
        defaultMessage: "Last name",
        description: "Last name label"
    });
    const dobLabel = intl.formatMessage({
        id: "profile.dob",
        defaultMessage: "Date of birth",
        description: "Date of birth label"
    });
    const countryLabel = intl.formatMessage({
        id: "profile.country",
        defaultMessage: "Country",
        description: "Country label"
    });
    const genderLabel = intl.formatMessage({
        id: "profile.gender",
        defaultMessage: "Gender",
        description: "Gender label"
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(clearFlags());
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, [dispatch, updatingFlags.updateSucceeded]);

    return (
        <div>
            <Formik
                initialValues={initialFormState}
                validationSchema={validationSchema}
            >
                {({
                      getFieldProps,
                      values,
                      errors,
                      setSubmitting,
                      setFieldValue,
                      touched,
                      setValues
                  }) => (
                    <>
                        <form method={POST}>
                            <div  className={classes.textFields}>
                                <TextField
                                    className={classes.textField}
                                    value={values.firstName}
                                    variant={"outlined"}
                                    label={firstNameLabel}
                                    error={(errors.firstName && touched.firstName)}
                                    helperText={(errors.firstName && touched.firstName) ? errors.firstName : " "}
                                    disabled={!isEditing}
                                    {...getFieldProps("firstName")}
                                />
                                <TextField
                                    className={classes.textField}
                                    value={values.lastName}
                                    variant={"outlined"}
                                    label={lastNameLabel}
                                    error={!!errors.lastName && touched.lastName}
                                    helperText={(!!errors.lastName && touched.lastName) ? errors.lastName : " "}
                                    disabled={!isEditing}
                                    {...getFieldProps("lastName")}
                                />
                                <TextField
                                    className={classes.textField}
                                    value={values.birthDay}
                                    type={"date"}
                                    variant={"outlined"}
                                    label={dobLabel}
                                    error={!!errors.birthDay && touched.birthDay}
                                    helperText={(!!errors.birthDay && touched.birthDay) ? errors.birthDay : " "}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={!isEditing}
                                    {...getFieldProps("birthDay")}
                                />
                                <Autocomplete
                                    className={classes.textField}
                                    disablePortal
                                    value={countriesList.find(c => c.value === values.country)}
                                    onChange={(_, v) => {
                                        setFieldValue('country', v.value);
                                    }}
                                    options={countriesList}
                                    getOptionLabel={option => option.label}
                                    disabled={!isEditing}
                                    renderInput={(params) => <TextField
                                        {...params}
                                        label={countryLabel}
                                        error={!!errors.country && touched.country}
                                        helperText={(!!errors.country && touched.country) ? errors.country : " "}
                                    />}
                                />
                                <FormControl className={classes.textField}>
                                    <InputLabel id="gender-select">{genderLabel}</InputLabel>
                                    <Select
                                        labelId="gender-select"
                                        label={genderLabel}
                                        value={values.gender}
                                        disabled={!isEditing}
                                        {...getFieldProps("gender")}
                                    >
                                        <MenuItem value={'M'}>Male</MenuItem>
                                        <MenuItem value={'F'}>Female</MenuItem>
                                        <MenuItem value={'U'}>Unknown</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={classes.buttonBlock}>
                                <Button
                                    variant={"contained"}
                                    size={"large"}
                                    onClick={() => {
                                        setSubmitting(true);
                                        handleSave(values, {setSubmitting, initialFormState});
                                    }}
                                    disabled={(!isEditing) || (!areFieldsChanged(values, initialFormState) || hasErrors(errors))}
                                >
                                    <FormattedMessage
                                        description="save button"
                                        defaultMessage="Save"
                                        id="profile.saveButton"
                                    />
                                </Button>
                                <div className={classes.resultIcon}>
                                    {showIcon(updatingFlags.isUpdating, updatingFlags.updateSucceeded, updatingFlags.wasUpdateRequested)}
                                </div>
                                <Button
                                    variant={"contained"}
                                    className={classes.cancel}
                                    color={"info"}
                                    size={"large"}
                                    onClick={() => {
                                        handleCancel(setValues, initialFormState);
                                    }}
                                    disabled={!isEditing}
                                >
                                    <FormattedMessage
                                        description="cancel button"
                                        defaultMessage="Cancel"
                                        id="profile.cancelButton"
                                    />
                                </Button>
                            </div>
                        </form>
                    </>
                )}
            </Formik>
        </div>
    );
};

ProfileInfo.propTypes = {};

export default injectIntl(ProfileInfo);