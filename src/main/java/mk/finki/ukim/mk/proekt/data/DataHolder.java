package mk.finki.ukim.mk.proekt.data;

import lombok.Data;
import lombok.Getter;
import mk.finki.ukim.mk.proekt.model.Car;
import mk.finki.ukim.mk.proekt.model.Key;
import mk.finki.ukim.mk.proekt.repository.jpa.JpaCarRepository;
import mk.finki.ukim.mk.proekt.repository.jpa.JpaKeyRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Getter
public class DataHolder {

    public static final List<Car> carList = new ArrayList<>();
    public static final List<Key> keyList = new ArrayList<>();
    public static final Map<Car,ArrayList<Key>> carMap = new HashMap<>();

    public final JpaCarRepository carRepository;
    public final JpaKeyRepository keyRepository;

    DataHolder(JpaCarRepository carRepository, JpaKeyRepository keyRepository){
        this.carRepository = carRepository;
        this.keyRepository = keyRepository;
    }

    @PostConstruct
    public void init(){

        keyList.add(new Key("u5d",13,"u5d description ...",100,true));
        keyList.add(new Key("u1d",15,"u1d description ...",100,true));
        keyList.add(new Key("sf6",17,"sf6 description ...",100,true));
        keyList.add(new Key("m3f",15,"m3f description ...",100,true));

        carList.add(new Car("1234","Audi","A3"));
        Key k = new Key("u5d",15,"u5d description ...",100,true);

        Car car = new Car("1234","Audi","A3");

        this.carRepository.saveAll(carList);
        this.keyRepository.saveAll(keyList);

    }

}

