package mk.finki.ukim.mk.proekt.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.List;

@Entity
@Data
public class Users {

    @Id
    @Column
    private String username;

    @Column
    private String password;

    @ManyToMany
    @Column
    private List<Key> keyList;

    public Users(String username, String password){
        this.username = username;
        this.password = password;
    }
    public Users(){}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Key> getKeyList() {
        return keyList;
    }

    public void setKeyList(List<Key> keyList) {
        this.keyList = keyList;
    }
}
