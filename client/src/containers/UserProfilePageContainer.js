import React, {useCallback, useState} from 'react';
import UserProfilePage from "../pages/UserProfilePage";
import {barItems} from "../components/Profile/ProfileBar/barItems";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId, selectUserInfo} from "../redux/selectors";
import {changeAvatarRequest, updateUserRequest} from "../redux/actions/actions";
import createJsonPatchDocument from "../helpers/createJsonPatchDocument";
import retrieveChangedValues from "../helpers/retrieveChangedValues";

const UserProfilePageContainer = () => {
    const user = useSelector(state => selectUserInfo(state));
    const userId = useSelector(state => selectUserId(state));
    const [currentBarItem, setCurrentBarItem] = useState(barItems[0].title);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();

    const [initialFormState, setInitialFormState] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        birthDay: user.birthDay,
        country: user.country,
        gender: user.gender
    });

    const [isDialogOpened, setIsDialogOpened] = useState(false);
    const [avatarChanged, setAvatarChanged] = useState(false);
    const [avatarBase64, setAvatarBase64] = useState(user.avatarUrl);

    const handleEdit = useCallback(() => {
        setCurrentBarItem(barItems[0].title);
        setIsEditing(true);
    }, []);

    const handleSave = useCallback((values, {setSubmitting, initialFormState}) => {
        setIsEditing(false);
        dispatch(updateUserRequest({
            id: userId,
            patchDocument: createJsonPatchDocument(
                retrieveChangedValues(values, initialFormState)
            )
        }));
        setSubmitting(false);
        setInitialFormState(values);
    }, [dispatch, userId]);

    const handleAvatarChanging = useCallback(() => {
        const fileInput = window.document.createElement('input');
        fileInput.setAttribute('type','file');
        fileInput.setAttribute('accept', 'image/png, image/jpeg');
        fileInput.onchange = e => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0])
            fileReader.onloadend = () => {
                if (fileReader.result.toString() !== avatarBase64) {
                    setAvatarBase64(fileReader.result.toString());
                    setAvatarChanged(true);
                }
            }
        }
        fileInput.click();
        fileInput.blur();
    }, [avatarBase64]);

    const handleBarItemChange = useCallback((title) => {
        setCurrentBarItem(title);
    }, []);

    const handleDialogOpening = useCallback(() => {
        setIsDialogOpened(true);
    }, []);

    const handleDialogClosing = useCallback(() => {
        setIsDialogOpened(false);
    }, []);

    const handleCancel = useCallback((setValues, values) => {
        setValues(values);
        setIsEditing(false);
    }, []);

    const handleAvatarSaving = useCallback(() => {
        if (avatarChanged) {
            dispatch(changeAvatarRequest({
                avatar_base64: avatarBase64.replace(/^data:image\/[a-z]+;base64,/, "")
            }))
            setAvatarChanged(false);
        }
    }, [avatarBase64, avatarChanged, dispatch]);

    return (
        <UserProfilePage
            handleAvatarSaving={handleAvatarSaving}
            avatarBase64={avatarBase64}
            handleDialogOpening={handleDialogOpening}
            handleDialogClosing={handleDialogClosing}
            isDialogOpened={isDialogOpened}
            user={user}
            currentBarItem={currentBarItem}
            handleBarItemChange={handleBarItemChange}
            handleAvatarChanging={handleAvatarChanging}
            isEditing={isEditing}
            handleEdit={handleEdit}
            handleSave={handleSave}
            initialFormState={initialFormState}
            handleCancel={handleCancel}
        />
    );
};

export default UserProfilePageContainer;