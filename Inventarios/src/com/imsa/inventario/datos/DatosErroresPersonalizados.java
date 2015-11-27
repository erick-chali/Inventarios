package com.imsa.inventario.datos;

public class DatosErroresPersonalizados {

	public DatosErroresPersonalizados(String mensaje){
		this.setMensaje(mensaje);
		
	}
	public DatosErroresPersonalizados(){}
	private String mensaje;

	/**
	 * @return the mensaje
	 */
	public String getMensaje() {
		return mensaje;
	}

	/**
	 * @param mensaje the mensaje to set
	 */
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	
}
