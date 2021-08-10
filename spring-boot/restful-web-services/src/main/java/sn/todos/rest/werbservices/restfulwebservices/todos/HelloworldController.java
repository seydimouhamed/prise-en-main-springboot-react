package sn.todos.rest.werbservices.restfulwebservices.todos;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import sn.todos.rest.werbservices.restfulwebservices.AuthenticationBean;

@RestController
@CrossOrigin(origins= "http://localhost:4000" )
public class HelloworldController {

	 //@RequestMapping(method = RequestMethod.GET, path= "/hello_world")
	@GetMapping(path= "/basicauth")
	public AuthenticationBean helloWolrd() {
		return new AuthenticationBean("Vous êtes connecté!");
	}
	 //
	 
//		@GetMapping(path= "/hello-world-bean")
//		public HelloWorldBean helloWolrdBean() {
//			return new HelloWorldBean("hello world bean");
//		} 
//		
//		
//		@GetMapping(path= "/hello-world/path-variable/{name}")
//		public HelloWorldBean helloWolrdPathVariable(@PathVariable String name) {
//			
//			throw new RuntimeException("Quelques chose ne va pas");
//			//return new HelloWorldBean(String.format("Hello world %s", name));
//		}
}
