import * as React from 'react';
import { render } from '@testing-library/react';
import { HotelCollectionContainer } from './hotel-collection.container';
import * as hook from './hotel-collection.hook';
import { HotelEntityVm } from './hotel-collection.vm';
import Axios from 'axios';

jest.mock('./hotel-collection.hook', () => {
  return {
    useHotelCollection: jest.fn().mockReturnValue({
      hotelCollection: [],
      loadHotelCollection: jest.fn(),
    }),
  };
});

describe('hotel-collection.container specs', () => {
  it('Should called hook when it mounts component', () => {
    // Arrange
    const useHotelCollectionStub = jest.spyOn(hook, 'useHotelCollection');

    // Act
    const {} = render(<HotelCollectionContainer />);

    // Assert
    expect(useHotelCollectionStub).toHaveBeenCalled();
  });

  it('Should display component when container render', () => {
    // Arrange

    // Act
    const { getByTestId } = render(<HotelCollectionContainer />);
    const element = getByTestId('div-hotel-container');

    // Assert

    expect(element).toBeInTheDocument();
  });

  it('Should called loadHotelCollection when useEffect is called', () => {
    // Arrange
    const hotelCollection: HotelEntityVm[] = [];
    const getStub = jest
      .spyOn(Axios, 'get')
      .mockResolvedValue({ data: hotelCollection });

    const loadHotelCollection = jest.fn().mockReturnValue(hotelCollection);

    const useEffect = jest
      .spyOn(React, 'useEffect')
      .mockReturnValue(loadHotelCollection());

    // Act
    const {} = render(<HotelCollectionContainer />);
    // Assert

    expect(loadHotelCollection).toHaveBeenCalled();
  });
});
