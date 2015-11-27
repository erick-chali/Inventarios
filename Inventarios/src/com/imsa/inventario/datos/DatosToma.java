package com.imsa.inventario.datos;

public class DatosToma {
	public DatosToma(int estado, String toma){
		this.setEstado(estado);
		this.setToma(toma);
	}
	public DatosToma(){}
	private int estado;
	private String toma;
	/**
	 * @return the estado
	 */
	public int getEstado() {
		return estado;
	}
	/**
	 * @param estado the estado to set
	 */
	public void setEstado(int estado) {
		this.estado = estado;
	}
	/**
	 * @return the toma
	 */
	public String getToma() {
		return toma;
	}
	/**
	 * @param toma the toma to set
	 */
	public void setToma(String toma) {
		this.toma = toma;
	}
	
		
}
