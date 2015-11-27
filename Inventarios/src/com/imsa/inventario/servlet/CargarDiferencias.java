package com.imsa.inventario.servlet;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.reflect.TypeToken;
import com.imsa.inventario.conexion.ConectarDB;
import com.imsa.inventario.datos.DatosDiferencias;

/**
 * Servlet implementation class CargarDiferencias
 */
@WebServlet("/CargarDiferencias")
public class CargarDiferencias extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CargarDiferencias() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		
		Connection con = null;
		CallableStatement stmt = null;
		ResultSet rs = null;
		ArrayList<DatosDiferencias> datosDiferencias = new ArrayList<DatosDiferencias>();
//		try{
//			con = new ConectarDB().getConnection();
//			stmt = con.prepareCall("{call stp_UDinGeneraDiferencias(?)}");
//			stmt.setInt(1, Integer.parseInt((String)request.getSession().getAttribute("noToma")));
//			rs = stmt.executeQuery();
//			
//			stmt.close();
//			rs.close();
//			con.close();
//		}catch(SQLException e){
//			response.setContentType("application/json");
//			response.getWriter().write(e.getMessage());
//		}
		try{
			
			
			con = new ConectarDB().getConnection();
			stmt = con.prepareCall("{call Stp_UDintomatabularNEW(?,?)}");
			stmt.setInt(1, Integer.parseInt((String)request.getSession().getAttribute("noToma")));
			stmt.setInt(2, Integer.parseInt((String)request.getSession().getAttribute("noToma")));
			rs = stmt.executeQuery();
			
			while(rs.next()){
				DatosDiferencias datos = new DatosDiferencias();
				datos.setCodigoProducto(rs.getString("producto"));
				datos.setBodega(rs.getString("bodega"));
				datos.setFamilia(rs.getString("familia"));
				datos.setMarca(rs.getString("marca"));
//				datos.setBodegaID(rs.getString("codigo_bodega"));
//				datos.setEstanteriaID(rs.getInt("estanteria_ID"));
//				datos.setSeccionID(rs.getInt("seccion_ID"));
				datos.setTeorico(rs.getInt("teorico"));
				datos.setReservado(rs.getInt("reservado"));
				datos.setExistencias(rs.getInt("existencias"));
				datos.setConteo(rs.getInt("conteo"));
				datos.setDiferencia(rs.getInt("diferencia"));
//				datos.setUnidad(rs.getInt("unidad_medida"));
				datosDiferencias.add(datos);
			}
			con.close();
			stmt.close();
			rs.close();
		}catch(SQLException e){
			response.setContentType("application/json");
			response.getWriter().write(e.getMessage());
		}

		
		Gson gson = new Gson();
		JsonElement elemento = gson.toJsonTree(datosDiferencias, new TypeToken<List<DatosDiferencias>>(){}.getType());
		JsonArray arreglo = elemento.getAsJsonArray();
		datosDiferencias = null;
		response.setContentType("application/json");
		
		response.getWriter().print(arreglo);
		
	}

}
