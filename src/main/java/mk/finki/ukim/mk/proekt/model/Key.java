package mk.finki.ukim.mk.proekt.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity(name = "Keys")
@Data
@Table(name = "Keys")
public class Key {

    @Id
    private String name;

    private double size;
    private String description;
    private int price;
    private boolean onStock;
    private String imageUrl;

    public Key(){}

    public Key(String name, double size, String description, int price, boolean onStock, String imageUrl){
        this.name = name;
        this.size = size;
        this.description = description;
        this.price = price;
        this.onStock = onStock;
        this.imageUrl = imageUrl;
    }

    public boolean isOnStock() {
        return onStock;
    }

    public void setOnStock(boolean onStock) {
        this.onStock = onStock;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSize() {
        return size;
    }

    public void setSize(double size) {
        this.size = size;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {

        return String.format("On stock: %s\nName: %s\nSize: %.2fcm\nPrice: %dДЕН\nDescription: %s",
                            this.onStock ? "Da" : "Ne", this.name, this.size, this.price, this.description);
    }
}
