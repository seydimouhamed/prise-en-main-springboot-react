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
public class TodoResource { 

	@Autowired
	private TodoHardcodedService todoService;
	
	@GetMapping("/users/{user_name}/todos")
	public List<Todo> getAllTodos(@PathVariable String user_name) throws InterruptedException{
		Thread.sleep(3000);
		return todoService.findAll();
	};
	
	@GetMapping("/users/{user_name}/todos/{id}")
	public Todo getTodo(@PathVariable String user_name, @PathVariable long id) throws InterruptedException{
		Thread.sleep(1000);
		return todoService.findById(id);
	};
	
	@DeleteMapping("/users/{user_name}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String user_name, @PathVariable long id)
	{
		Todo todo = todoService.deleteById(id);
		if(todo != null) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
	}
	
	@PutMapping("/users/{user_name}/todos/{todo_id}")
	public ResponseEntity<Todo> updateTodo(
			@PathVariable String user_name,
			@PathVariable long todo_id,
			@RequestBody Todo todo)
	{
		Todo todoUpdated = todoService.save(todo);
		if(todoUpdated != null) {
			return ResponseEntity.noContent().build();
		}

		return new ResponseEntity<Todo>(todoUpdated, HttpStatus.OK);
	}
	
	@PostMapping("/users/{user_name}/todos")
	public ResponseEntity<Void> postTodo(
			@PathVariable String user_name,
			@RequestBody Todo todo)
	{
		Todo createdTodo = todoService.save(todo);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
		

		return ResponseEntity.created(uri).build();
	}
}
