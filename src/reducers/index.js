import * as actions from '../actions';

export const initialState = {
  additionalPrice: 0,
  car: {
    price: 26395,
    name: '2019 Ford Mustang',
    image:
      'https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg',
    features: []
  },
  store: [
    { id: 1, name: '10-speed automatic', price: 1500 },
    { id: 2, name: 'Performance Pack', price: 1500 },
    { id: 3, name: 'Shaker 500 Premium Sound', price: 500 },
    { id: 4, name: 'Magnaride Suspnesion', price: 2000 }
  ]
};

export const reducer = (state = initialState, action) => {
  switch(action.type){
    case actions.ADD_ITEM: {
      if(state.car.features.every(el => el.id !== action.payload.id)){
        return {
          ...state,
          additionalPrice: state.additionalPrice + action.payload.price,
          car: {
            ...state.car,
            features: [
              ...state.car.features,
              action.payload
            ]
          }
        }
      } else return state;
    }
    case actions.REMOVE_ITEM: {
      let priceToSubtract = 0;
      const features = state.car.features.filter(el => {
        if(el.id !== action.payload){
          return true;
        } else {
          priceToSubtract = el.price;
          return false;
        }
      })
      return {
        ...state,
        additionalPrice: state.additionalPrice - priceToSubtract,
        car: {
          ...state.car,
          features
        }
      }
    }
    default: {
      return state;
    }
  }
}