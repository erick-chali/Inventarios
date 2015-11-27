package com.imsa.inventario.datos;

public class DatosEstanteria {
	public DatosEstanteria(int estanteria_ID, String descripcion ){
		this.setEstanteria_ID(estanteria_ID);
		this.setDescripcion(descripcion);
	}
	public DatosEstanteria(){}
	private int estanteria_ID;
	private String descripcion;
	/**
	 * @return the estanteria_ID
	 */
	public int getEstanteria_ID() {
		return estanteria_ID;
	}
	/**
	 * @param estanteria_ID the estanteria_ID to set
	 */
	public void setEstanteria_ID(int estanteria_ID) {
		this.estanteria_ID = estanteria_ID;
	}
	/**
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}
	/**
	 * @param descripcion the descripcion to set
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	
}
