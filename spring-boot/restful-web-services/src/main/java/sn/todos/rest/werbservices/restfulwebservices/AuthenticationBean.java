package sn.todos.rest.werbservices.restfulwebservices;

public class AuthenticationBean {
	
	private String message;
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public AuthenticationBean(String message) {
		this.message = message;
	}
	@Override
	public String toString() {
		//return "HelloWorldBean [message=" + message + "]";
		return String.format("HelloWolrdBean [message=%s", message);
	}

}
