package mk.finki.ukim.mk.proekt.service.impl;

import mk.finki.ukim.mk.proekt.model.Car;
import mk.finki.ukim.mk.proekt.model.Key;
import mk.finki.ukim.mk.proekt.repository.CarRepository;
import mk.finki.ukim.mk.proekt.repository.KeyRepository;
import mk.finki.ukim.mk.proekt.service.CarService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarServiceImpl implements CarService {

    CarRepository carRepository;
    CarServiceImpl(CarRepository carRepository){
        this.carRepository = carRepository;
    }

    @Override
    public List<Car> searchCars(String carBrand, String carModel, int year) {
        return this.carRepository.getAllCars().stream()
                .filter(car -> car.getCarBrand().equals(carBrand)
                        && car.getCarModel().equals(carModel)
                        && car.getYear() == year)
                .collect(Collectors.toList());
    }

    @Override
    public List<Car> searchCarsNewerThan(int year) {
        return this.carRepository.getAllCars().stream()
                .filter(car -> car.getYear() > year)
                .collect(Collectors.toList());
    }

    @Override
    public List<Car> searchCarsOlderThan(int year) {
        return this.carRepository.getAllCars().stream()
                .filter(car -> car.getYear() < year)
                .collect(Collectors.toList());
    }

    //String carId, String carBrand, String carModel
    @Override
    public Car createCar(String id, String brand, String model,int year) {
        Car car = new Car(id, brand, model,year);
        return this.carRepository.save(car);
    }

    @Override
    public Car createCar(Car c) {
        return this.carRepository.save(c);
    }

    @Override
    public List<Car> getAllCars() {
        return this.carRepository.getAllCars();
    }

    @Override
    public Optional<Car> getCar(String carId) {
        return this.carRepository.findById(carId);
    }

    @Override
    public Car updateCar(String id, String brand, String model, List<Key> keyList) {
        Car car = this.carRepository.findById(id).orElse(null);
        if (car != null){
            car.setCarId(id);
            car.setCarBrand(brand);
            car.setCarModel(model);
            car.setKeyList(keyList);
        }
        return car;
    }

    @Override
    public Car updateCar(String carId, Car c) {
        Car car = this.carRepository.findById(carId).orElse(null);
        if (car != null){
            car.setCarBrand(c.getCarBrand());
            car.setCarModel(c.getCarModel());
            car.setKeyList(c.getKeyList());
        }
        return car;
    }

    @Override
    public void deleteCar(String carId) {
        this.carRepository.deleteById(carId);
    }
}
