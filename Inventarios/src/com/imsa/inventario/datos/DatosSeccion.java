package com.imsa.inventario.datos;

public class DatosSeccion {
	public DatosSeccion(String codigoSeccion, String descripcionSeccion){
		this.setCodigoSeccion(codigoSeccion);
		this.setDescripcionSeccion(descripcionSeccion);
	}
	public DatosSeccion(){}
	private String codigoSeccion;
	private String descripcionSeccion;
	/**
	 * @return the codigoSeccion
	 */
	public String getCodigoSeccion() {
		return codigoSeccion;
	}
	/**
	 * @param codigoSeccion the codigoSeccion to set
	 */
	public void setCodigoSeccion(String codigoSeccion) {
		this.codigoSeccion = codigoSeccion;
	}
	/**
	 * @return the descripcionSeccion
	 */
	public String getDescripcionSeccion() {
		return descripcionSeccion;
	}
	/**
	 * @param descripcionSeccion the descripcionSeccion to set
	 */
	public void setDescripcionSeccion(String descripcionSeccion) {
		this.descripcionSeccion = descripcionSeccion;
	}
	
}
