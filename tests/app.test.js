import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent } from '@testing-library/react-native';
import NewUserStartStack from '../components/newUserStack/NewUserStartPage';
import { LoginFormFunctions, RegisterFormFunctions, UserFunctions } from '../nameSpaces'

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
describe('Page renders with a Login and SignUp screen', ()=> {
    test('page contains login component',  async ()=> {
        const component = (
            <NavigationContainer>
                 <NewUserStartStack/>
            </NavigationContainer>
        )
        const { findByText } = render(component);
        const login = await findByText('LOGIN')
        expect(login).toBeTruthy()
});
test('Clicking Login asks for username and password', async ()=>{
    const component = (
        <NavigationContainer>
             <NewUserStartStack LoginFormFunctions={LoginFormFunctions}
                RegisterFormFunctions={RegisterFormFunctions}/>
        </NavigationContainer>
    )

    const { findByText } = render(component);
    const toClick = await findByText('LOGIN');

    fireEvent(toClick, 'press');
    const newHeader = await findByText('LOG IN');
   
    expect(newHeader).toBeTruthy();

})
});