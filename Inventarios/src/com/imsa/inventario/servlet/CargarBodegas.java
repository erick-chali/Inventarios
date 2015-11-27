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
import com.imsa.inventario.datos.DatosBodega;

/**
 * Servlet implementation class CargarBodegas
 */
@WebServlet("/CargarBodegas")
public class CargarBodegas extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CargarBodegas() {
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
		ArrayList<DatosBodega> datosBodega = new ArrayList<DatosBodega>();
		
		try{
			con = new ConectarDB().getConnection();
			stmt = con.prepareCall("{call stp_udtf_consultabodegaNEW(?)}");
			stmt.setInt(1, Integer.parseInt((String)request.getSession().getAttribute("noToma")));
			rs = stmt.executeQuery();
			
			while(rs.next()){
				DatosBodega datos = new DatosBodega();
				datos.setBodegaID(rs.getString("codigo_bodega"));
				datos.setDescripcionBodega(rs.getString("descripcion"));
				datosBodega.add(datos);
			}
		}catch(SQLException e){
			response.setContentType("application/json");
			response.getWriter().print(e.getMessage());
		}finally{
			if(con!=null){
				try {
					con.close();
					stmt.close();
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					response.setContentType("application/json");
					response.getWriter().print(e.getMessage());
				}
			}
		}
		Gson gson = new Gson();
		JsonElement elemento = gson.toJsonTree(datosBodega, new TypeToken<List<DatosBodega>>(){}.getType());
		JsonArray arreglo = elemento.getAsJsonArray();
		datosBodega = null;
		response.setContentType("application/json");
		
		response.getWriter().print(arreglo);
	}

}
