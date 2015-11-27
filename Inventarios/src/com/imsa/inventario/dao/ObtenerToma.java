package com.imsa.inventario.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.imsa.inventario.conexion.ConectarDB;

public class ObtenerToma {
	private static int estado;
	public int numToma(String numToma){
		Connection con =null;
		ResultSet rs = null;
		StringBuilder sb = null;
		PreparedStatement st = null;
		
		try {
			con = new ConectarDB().getConnection();
			sb = new StringBuilder();
			sb.append("SELECT estado_toma from in_tomafisica_enc where no_toma='"+numToma+"';");
			st = con.prepareStatement(sb.toString());
			rs = st.executeQuery();
			if(rs.next()){
				estado = Integer.parseInt(rs.getString("estado_toma"));	
			}else{
				estado=4;
			}
			
		} catch (SQLException e) {
			// TODO: handle exception
		}
		return estado;
	}
}
