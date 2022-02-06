const initialState = {
    login: "Igor Любитель пива",
    email: "igorpivo@gmail.com",
    password: "123456",
    avatarUrl: "https://i.pinimg.com/originals/df/c5/fa/dfc5faf10d97e9c45fb29f8ecff17716.jpg",
    favoriteBeer: [1,2,4,5]
}

export const userReducer = (state = initialState, action) => {
    return state;
}