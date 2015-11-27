package com.imsa.inventario.datos;

public class DatosProductosAuditor {
	public DatosProductosAuditor(
			int noToma, String codigoProducto, String descripcion, String bodegaID,int conteo1,
			int conteo2, int seccionID, int estanteriaID, String unidad, String estanteria,
			String seccion, String bodega, int cantidad, int usuarioID, String username, String nombre
			
			){
		this.setCodigoProducto(codigoProducto);
		this.setNoToma(noToma);
		this.setDescripcion(descripcion);
		this.setBodegaID(bodegaID);
		this.setConteo1(conteo1);
		this.setConteo2(conteo2);
		this.setCantidad(cantidad);
		this.setSeccionID(seccionID);
		this.setEstanteriaID(estanteriaID);
		this.setUnidad(unidad);
		this.setEstanteria(estanteria);
		this.setSeccion(seccion);
		this.setBodega(bodega);
		this.setUsuarioID(usuarioID);
		this.setUsername(username);
		this.setNombre(nombre);
		
	}
	public DatosProductosAuditor(){}
	private int noToma;
	private String codigoProducto;
	private String descripcion;
	private String bodegaID;
	private int cantidad;
	private int conteo1;
	private int conteo2;
	private int seccionID;
	private int estanteriaID;
	private String unidad;
	private String estanteria;
	private String seccion;
	private String bodega;
	private int usuarioID;
	private String username;
	private String nombre;
	/**
	 * @return the noToma
	 */
	public int getNoToma() {
		return noToma;
	}
	/**
	 * @param noToma the noToma to set
	 */
	public void setNoToma(int noToma) {
		this.noToma = noToma;
	}
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
	 * @return the conteo1
	 */
	public int getConteo1() {
		return conteo1;
	}
	/**
	 * @param conteo1 the conteo1 to set
	 */
	public void setConteo1(int conteo1) {
		this.conteo1 = conteo1;
	}
	/**
	 * @return the conteo2
	 */
	public int getConteo2() {
		return conteo2;
	}
	/**
	 * @param conteo2 the conteo2 to set
	 */
	public void setConteo2(int conteo2) {
		this.conteo2 = conteo2;
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
	 * @return the unidad
	 */
	public String getUnidad() {
		return unidad;
	}
	/**
	 * @param unidad the unidad to set
	 */
	public void setUnidad(String unidad) {
		this.unidad = unidad;
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
	 * @return the usuarioID
	 */
	public int getUsuarioID() {
		return usuarioID;
	}
	/**
	 * @param usuarioID the usuarioID to set
	 */
	public void setUsuarioID(int usuarioID) {
		this.usuarioID = usuarioID;
	}
	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}
	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	/**
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}
	/**
	 * @param nombre the nombre to set
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	
}
