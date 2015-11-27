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
import com.imsa.inventario.datos.DatosSeccion;

/**
 * Servlet implementation class BuscaSeccion
 */
@WebServlet("/BuscaSeccion")
public class BuscaSeccion extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BuscaSeccion() {
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
		request.getSession().setAttribute("estanteriaID", request.getParameter("codigoe"));
		
		Connection con = null;
		CallableStatement stmt = null;
		ResultSet rs = null;
		ArrayList<DatosSeccion> datosSeccion = new ArrayList<DatosSeccion>();
		try{
			con = new ConectarDB().getConnection();
			stmt = con.prepareCall("{call stp_udtf_consultabodegaNEW(?)}");
			stmt.setInt(1, Integer.parseInt((String)request.getSession().getAttribute("noToma")));
			rs = stmt.executeQuery();
			
			while(rs.next()){
				request.getSession().setAttribute("codigoBodega", rs.getString("codigo_bodega"));
			}
			stmt.close();
			rs.close();
			con.close();
			
			con = new ConectarDB().getConnection();
			stmt = con.prepareCall("{call stp_buscaseccionNEW(?,?)}");
			stmt.setString(1, (String) request.getSession().getAttribute("codigoBodega"));
			stmt.setInt(2, Integer.parseInt((String) request.getSession().getAttribute("estanteriaID")));
			rs = stmt.executeQuery();
			while(rs.next()){
				DatosSeccion datos = new DatosSeccion();
				datos.setCodigoSeccion(rs.getString("Seccion_Id"));
				datos.setDescripcionSeccion(rs.getString("descripcion"));
				datosSeccion.add(datos);
			}
			stmt.close();
			rs.close();
			con.close();
		}catch(SQLException e){
			response.setContentType("text/html");
			response.getWriter().write("Error: " + e.getMessage()); 
		}
		
		Gson gson = new Gson();
		JsonElement elemento = gson.toJsonTree(datosSeccion, new TypeToken<List<DatosSeccion>>(){}.getType());
		JsonArray arreglo = elemento.getAsJsonArray();
		response.setContentType("application/json");
		response.getWriter().print(arreglo);
	}

}
