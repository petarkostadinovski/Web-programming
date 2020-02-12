package mk.finki.ukim.mk.proekt.service;

import mk.finki.ukim.mk.proekt.model.Car;
import mk.finki.ukim.mk.proekt.model.Key;

import java.util.List;
import java.util.Optional;

public interface CarService {
   // String carId, String carBrand, String carModel

    Car createCar(String carId, String carBrand, String carModel);

    Car createCar(Car c);

    List<Car> getAllCars();

    List<Car> searchCars (String brand);

    Optional<Car> getCar(String carId);

    Car updateCar(String carId, String carBrand, String carModel, List<Key> keyList);

    Car updateCar(String carId, Car c);

    void deleteCar(String carId);
}
