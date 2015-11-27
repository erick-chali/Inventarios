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
import com.imsa.inventario.datos.DatosEstanteria;

/**
 * Servlet implementation class CargarEstanteria
 */
@WebServlet("/CargarEstanteria")
public class CargarEstanteria extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CargarEstanteria() {
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
		ArrayList<DatosEstanteria> estanterias = new ArrayList<DatosEstanteria>();
		
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
			stmt = con.prepareCall("{call stp_buscaEstanteriaNEW(?)}");
			stmt.setString(1, (String)request.getSession().getAttribute("codigoBodega"));
			rs = stmt.executeQuery();
			
			while(rs.next()){
				DatosEstanteria dato = new DatosEstanteria();
				dato.setEstanteria_ID(rs.getInt("Estanteria_Id"));
				dato.setDescripcion(rs.getString("descripcion"));
				estanterias.add(dato);
			}
			stmt.close();
			rs.close();
			con.close();
		}catch(SQLException e){
			response.setContentType("application/json");
			response.getWriter().write(e.getMessage());
		}
		Gson gson = new Gson();
		JsonElement elemento = gson.toJsonTree(estanterias, new TypeToken<List<DatosEstanteria>>(){}.getType());
		JsonArray arreglo = elemento.getAsJsonArray();
		estanterias = null;
		response.setContentType("application/json");
		response.getWriter().print(arreglo);
	}

}
