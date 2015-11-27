package com.imsa.inventario.datos;
/**
 * TODAS LAS CLASES DENTRO DEL PAQUETE com.imsa.inventario.datos tienen las mismas caracteristicas, solo las variables cambian.
 * El nombre de las variables esta ligada a la lista de objetos json que se envian entre el servidor y el cliente.
 * **/
public class DatosProducto {
	//con esto se genera la lista.
	public DatosProducto(String codigoProducto, String descripcion, String unidadInventario
			,int conteo1, int conteo2 
			){
		this.setCodigoProducto(codigoProducto);
		this.setDescripcion(descripcion);
		this.setUnidadInventario(unidadInventario);
		this.setConteo1(conteo1);
		this.setConteo2(conteo2);
	}
	//constructor, inicializa la clase al llamarlo.
	public DatosProducto(){}
	//variables que son el key de la lista json.
	private String codigoProducto;
	private String descripcion;
	private String unidadInventario;
	private int conteo1;
	private int conteo2;
	
	
	//metodos get y set que son necesarios
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
	 * @return the unidadInventario
	 */
	public String getUnidadInventario() {
		return unidadInventario;
	}
	/**
	 * @param unidadInventario the unidadInventario to set
	 */
	public void setUnidadInventario(String unidadInventario) {
		this.unidadInventario = unidadInventario;
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
	
	
}
