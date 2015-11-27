package com.imsa.inventario.datos;

public class DatosPermisos {
	public DatosPermisos(int permiso){
		this.setPermiso(permiso);
	}
	public DatosPermisos(){
		
	}
//	private String conteo1;
//	private String conteo2;
//	private String inventario;
//	private String auditoria;
//	private String diferencia;
	private int permiso;
	/**
	 * @return the permiso
	 */
	public int getPermiso() {
		return permiso;
	}
	/**
	 * @param permiso the permiso to set
	 */
	public void setPermiso(int permiso) {
		this.permiso = permiso;
	}
	
	
}
