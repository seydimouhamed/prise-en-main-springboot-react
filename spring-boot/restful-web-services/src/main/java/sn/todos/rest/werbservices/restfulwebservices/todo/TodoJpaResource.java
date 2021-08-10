package sn.todos.rest.werbservices.restfulwebservices.todo;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@RestController
@CrossOrigin(origins= "http://localhost:4000" )
public class TodoJpaResource { 

	@Autowired
	private TodoHardcodedService todoService;
	
	@Autowired
	private TodoJpaRepository  todoJpaRepository;
	 
	@GetMapping("/jpa/users/{user_name}/todos")
	public List<Todo> getAllTodos(@PathVariable String user_name) throws InterruptedException{
		Thread.sleep(3000);
		return todoJpaRepository.findByUsername(user_name);
		// return todoService.findAll();
	};
	
	@GetMapping("/jpa/users/{user_name}/todos/{id}")
	public Todo getTodo(@PathVariable String user_name, @PathVariable long id) throws InterruptedException{
		//Thread.sleep(1000);
		return todoJpaRepository.findById(id).get();
		// return todoService.findById(id);
	};
	
	@DeleteMapping("/jpa/users/{user_name}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String user_name, @PathVariable long id)
	{
		 todoJpaRepository.deleteById(id);
		
		 return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/jpa/users/{user_name}/todos/{todo_id}")
	public ResponseEntity<Todo> updateTodo(
			@PathVariable String user_name,
			@PathVariable long todo_id,
			@RequestBody Todo todo)
	{

		todo.setUsername(user_name);
		Todo todoUpdated = todoJpaRepository.save(todo);
		if(todoUpdated != null) {
			return ResponseEntity.noContent().build();
		}

		return new ResponseEntity<Todo>(todoUpdated, HttpStatus.OK);
	}
	
	@PostMapping("/jpa/users/{user_name}/todos")
	public ResponseEntity<Void> createTodo(
			@PathVariable String user_name,
			@RequestBody Todo todo)
	{
		todo.setUsername(user_name);
		
		Todo createdTodo = todoJpaRepository.save(todo);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
		

		return ResponseEntity.created(uri).build();
	}
}
