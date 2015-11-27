package com.imsa.inventario.datos;

public class DatosBodega {

	public DatosBodega(String bodegaID, String descripcionBodega){
		this.setBodegaID(bodegaID);
		this.setDescripcionBodega(descripcionBodega);
	}
	public DatosBodega(){}
	private String bodegaID;
	private String descripcionBodega;
	/**
	 * @return the bodegaID
	 */
	public String getBodegaID() {
		return bodegaID;
	}
	/**
	 * @param bodegaID the bodegaID to set
	 */
	public void setBodegaID(String bodegaID) {
		this.bodegaID = bodegaID;
	}
	/**
	 * @return the descripcionBodega
	 */
	public String getDescripcionBodega() {
		return descripcionBodega;
	}
	/**
	 * @param descripcionBodega the descripcionBodega to set
	 */
	public void setDescripcionBodega(String descripcionBodega) {
		this.descripcionBodega = descripcionBodega;
	}
	
}
