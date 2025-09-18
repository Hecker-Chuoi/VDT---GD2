package vn.viettel.vdt_gd2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import vn.viettel.vdt_gd2.repository.ConnectionRepository;
import vn.viettel.vdt_gd2.repository.UserRepository;

@SpringBootApplication
public class NocproTopologyApplication implements CommandLineRunner {
	@Autowired
	UserRepository userRepo;

	public static void main(String[] args) {
		SpringApplication.run(NocproTopologyApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
	}
}
