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
import com.imsa.inventario.datos.DatosPermisos;

//import com.google.gson.Gson;
//import com.google.gson.JsonArray;
//import com.google.gson.JsonElement;
//import com.google.gson.reflect.TypeToken;
//import com.imsa.inventario.datos.ParamPermiso;
//import com.imsa.inventario.conexion.ConectarDB;
//import com.imsa.inventario.dao.ImplementaPermisos;
//import com.imsa.inventario.dao.InterfazPermisos;

/**
 * Servlet implementation class Permisos
 */
@WebServlet("/Permisos")
public class Permisos extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Permisos() {
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
		request.getSession().setAttribute("op", request.getParameter("op"));
		Connection con = null;
		CallableStatement stmt = null;
		ResultSet rs = null;
		ArrayList<String> paginas = new ArrayList<String>();
		paginas.add("conteo1");
		paginas.add("conteo2");
		paginas.add("inventario");
		paginas.add("auditoria");
		paginas.add("diferencia");
		ArrayList<DatosPermisos> permisos = new ArrayList<DatosPermisos>();
		try{
			/**parametro 1*/
			for(int x=0;x<paginas.size();x++){
				con = new ConectarDB().getConnection();
				stmt = con.prepareCall("{call _OpcionPermisosNEW(?,?)}");
				stmt.setString(1, paginas.get(x));
				stmt.setInt(2, Integer.parseInt((String)request.getSession().getAttribute("userId")));
				rs = stmt.executeQuery();
				while(rs.next()){
					DatosPermisos dato = new DatosPermisos();
					dato.setPermiso(rs.getInt("ejecutar"));
//					respuesta = rs.getString("ejecutar");
					permisos.add(dato);
				}
				con.close();
				stmt.close();
				rs.close();
			}
			
		}catch(SQLException e){
			response.setContentType("application/json");
			response.getWriter().print(e.getMessage());
			
			System.out.println("Error: " + e.getMessage());
		}
//		response.setContentType("text/html");
//		response.getWriter().write(respuesta);
		Gson gson = new Gson();
		JsonElement elemento = gson.toJsonTree(permisos, new TypeToken<List<DatosPermisos>>(){}.getType());
		JsonArray arreglo = elemento.getAsJsonArray();
		permisos = null;
		response.setContentType("application/json");
		response.getWriter().print(arreglo);
	}

}
