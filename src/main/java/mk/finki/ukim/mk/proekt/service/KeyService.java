package mk.finki.ukim.mk.proekt.service;

import mk.finki.ukim.mk.proekt.model.Key;

import java.util.List;
import java.util.Optional;



public interface KeyService {
    Key createKey(String name, double size, String description, int price, boolean onStock);

    Key createKey(Key k);

    List<Key> getAllKeys();

    List<Key> searchKeys(int price);

    List<Key> searchOnStockKeys (boolean onStock);

    Optional<Key> getKey(String name);

    Key updateKey(String name, double size, String description, int price, boolean onStock);

    Key updateKey(String name, Key k);

    void deleteKey(String name);

}
