package com.imsa.inventario.datos;

public class DatosBusquedaCodigo {
	public DatosBusquedaCodigo(
			String codigoProducto, String descripcion, String seccion, String estanteria, String unidadMedida, String bodega,
			int cantidad, int estanteriaID, int seccionID
			){
		this.setCodigoProducto(codigoProducto);
		this.setDescripcion(descripcion);
		this.setSeccion(seccion);
		this.setEstanteria(estanteria);
		this.setUnidadMedida(unidadMedida);
		this.setBodega(bodega);
		this.setCantidad(cantidad);
		this.setEstanteriaID(estanteriaID);
		this.setSeccionID(seccionID);
	}
	public DatosBusquedaCodigo(){}
	private String codigoProducto;
	private String descripcion;
	private String seccion;
	private String estanteria;
	private String unidadMedida;
	private String bodega;
	private int cantidad;
	private int estanteriaID;
	private int seccionID;
	/**
	 * @return the codigoProducto
	 */
	public String getCodigoProducto() {
		return codigoProducto;
	}
	/**
	 * @param codigoProducto the codigoProducto to set
	 */
	public void setCodigoProducto(String codigoProducto) {
		this.codigoProducto = codigoProducto;
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
	/**
	 * @return the seccion
	 */
	public String getSeccion() {
		return seccion;
	}
	/**
	 * @param seccion the seccion to set
	 */
	public void setSeccion(String seccion) {
		this.seccion = seccion;
	}
	/**
	 * @return the estanteria
	 */
	public String getEstanteria() {
		return estanteria;
	}
	/**
	 * @param estanteria the estanteria to set
	 */
	public void setEstanteria(String estanteria) {
		this.estanteria = estanteria;
	}
	/**
	 * @return the unidadMedida
	 */
	public String getUnidadMedida() {
		return unidadMedida;
	}
	/**
	 * @param unidadMedida the unidadMedida to set
	 */
	public void setUnidadMedida(String unidadMedida) {
		this.unidadMedida = unidadMedida;
	}
	/**
	 * @return the bodega
	 */
	public String getBodega() {
		return bodega;
	}
	/**
	 * @param bodega the bodega to set
	 */
	public void setBodega(String bodega) {
		this.bodega = bodega;
	}
	/**
	 * @return the cantidad
	 */
	public int getCantidad() {
		return cantidad;
	}
	/**
	 * @param cantidad the cantidad to set
	 */
	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}
	/**
	 * @return the estanteriaID
	 */
	public int getEstanteriaID() {
		return estanteriaID;
	}
	/**
	 * @param estanteriaID the estanteriaID to set
	 */
	public void setEstanteriaID(int estanteriaID) {
		this.estanteriaID = estanteriaID;
	}
	/**
	 * @return the seccionID
	 */
	public int getSeccionID() {
		return seccionID;
	}
	/**
	 * @param seccionID the seccionID to set
	 */
	public void setSeccionID(int seccionID) {
		this.seccionID = seccionID;
	}
	
	
}
