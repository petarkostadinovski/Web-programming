package mk.finki.ukim.mk.proekt.web.api;

import mk.finki.ukim.mk.proekt.model.Car;
import mk.finki.ukim.mk.proekt.model.Key;
import mk.finki.ukim.mk.proekt.service.CarService;
import mk.finki.ukim.mk.proekt.service.KeyService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/cars")
public class CarsApi {

    private final CarService carService;
    public CarsApi(CarService carService){
        this.carService = carService;
    }

    @GetMapping
    public List<Car> getAllCars(){
        return carService.getAllCars();
    }

    @GetMapping("/{id}")
    public Optional<Car> getCar(@PathVariable String id){
        return carService.getCar(id);
    }

    @PutMapping("/{id}")
    public Car updateCar(@PathVariable String id, @RequestBody Car c){
        return carService.updateCar(id,c);
    }
    // @PutMapping("/{id}")
    //    public Key updateKey(@PathVariable String id, @RequestBody Key k){
    //        return keyService.updateKey(id,k);
    //    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Car addCar(@RequestBody Car c){
        return carService.createCar(c);
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable String id){
        carService.deleteCar(id);
    }

    @GetMapping(params = "yearNewer")
    public List<Car> searchNewerThan(@RequestParam int yearNewer)
    {
        return carService.searchCarsNewerThan(yearNewer);
    }
    @GetMapping(params = "yearOlder")
    public List<Car> searchOlderThan(@RequestParam int yearOlder)
    {
        return carService.searchCarsOlderThan(yearOlder);
    }

    @GetMapping(params = {"carBrand","carModel","year"})
    public List<Car> searchCars(@RequestParam String carBrand,
                                          @RequestParam String carModel,
                                          @RequestParam int year)
    {
        return carService.searchCars(carBrand,carModel,year);
    }


}
