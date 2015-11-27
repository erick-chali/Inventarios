package com.imsa.inventario.datos;

public class DatosDiferencias {
	public DatosDiferencias(String codigoProducto, String bodega, int conteo, String familia, String marca
			,int reservado, int teorico, int existencias, int diferencia, String bodegaID, int seccionID, 
			int estanteriaID, int unidad
			){
		this.setCodigoProducto(codigoProducto);
		this.setBodega(bodega);
		this.setConteo(conteo);
		this.setFamilia(familia);
		this.setMarca(marca);
		this.setReservado(reservado);
		this.setTeorico(teorico);
		this.setExistencias(existencias);
		this.setDiferencia(diferencia);
		this.setBodegaID(bodegaID);
		this.setSeccionID(seccionID);
		this.setEstanteriaID(estanteriaID);
		this.setUnidad(unidad);
	}
	public DatosDiferencias(){}
	
	private String codigoProducto;
	private String bodega;
	private String familia;
	private String marca;
	private int conteo;
	private int reservado;
	private int teorico;
	private int existencias;
	private int diferencia;
	private String bodegaID;
	private int estanteriaID;
	private int seccionID;
	private int unidad;
	
	/**
	 * @return the unidad
	 */
	public int getUnidad() {
		return unidad;
	}
	/**
	 * @param unidad the unidad to set
	 */
	public void setUnidad(int unidad) {
		this.unidad = unidad;
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
	 * @return the familia
	 */
	public String getFamilia() {
		return familia;
	}
	/**
	 * @param familia the familia to set
	 */
	public void setFamilia(String familia) {
		this.familia = familia;
	}
	/**
	 * @return the marca
	 */
	public String getMarca() {
		return marca;
	}
	/**
	 * @param marca the marca to set
	 */
	public void setMarca(String marca) {
		this.marca = marca;
	}
	/**
	 * @return the conteo
	 */
	public int getConteo() {
		return conteo;
	}
	/**
	 * @param conteo the conteo to set
	 */
	public void setConteo(int conteo) {
		this.conteo = conteo;
	}
	/**
	 * @return the reservado
	 */
	public int getReservado() {
		return reservado;
	}
	/**
	 * @param reservado the reservado to set
	 */
	public void setReservado(int reservado) {
		this.reservado = reservado;
	}
	/**
	 * @return the teorico
	 */
	public int getTeorico() {
		return teorico;
	}
	/**
	 * @param teorico the teorico to set
	 */
	public void setTeorico(int teorico) {
		this.teorico = teorico;
	}
	/**
	 * @return the existencias
	 */
	public int getExistencias() {
		return existencias;
	}
	/**
	 * @param existencias the existencias to set
	 */
	public void setExistencias(int existencias) {
		this.existencias = existencias;
	}
	/**
	 * @return the diferencia
	 */
	public int getDiferencia() {
		return diferencia;
	}
	/**
	 * @param diferencia the diferencia to set
	 */
	public void setDiferencia(int diferencia) {
		this.diferencia = diferencia;
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
