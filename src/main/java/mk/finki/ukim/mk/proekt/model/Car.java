package mk.finki.ukim.mk.proekt.model;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity(name = "Cars")
@Data
public class Car {

    @Id
    String carId;

    @OneToMany
    private List<Key> keyList;

    private String carBrand;
    private String carModel;

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    private int year;

    public Car(){
        keyList = new ArrayList<>();
    }
    public Car(String carId, String carBrand, String carModel, int year){
        this.carId = carId;
        this.carBrand = carBrand;
        this.carModel = carModel;
        this.year = year;
        keyList = new ArrayList<>();
    }

    public void addKey(Key key){
        keyList.add(key);
    }

    public String getCarId() {
        return carId;
    }

    public void setCarId(String carId) {
        this.carId = carId;
    }

    public List<Key> getKeyList() {
        return keyList;
    }

    public void setKeyList(List<Key> keyList) {
        this.keyList = keyList;
    }

    public String getCarBrand() {
        return carBrand;
    }

    public void setCarBrand(String carBrand) {
        this.carBrand = carBrand;
    }

    public String getCarModel() {
        return carModel;
    }

    public void setCarModel(String carModel) {
        this.carModel = carModel;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        this.keyList.forEach(key -> sb.append(key.getName()).append(" "));

        return "Brand: " + this.carBrand + "Model: " + this.carModel + "Id: " + "\n" + this.carId + "\n" + "List of keys: " + sb.toString();
    }
}
