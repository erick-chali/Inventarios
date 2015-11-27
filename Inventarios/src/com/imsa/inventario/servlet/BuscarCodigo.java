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
import com.imsa.inventario.datos.DatosBusquedaCodigo;

/**
 * Servlet implementation class BuscarCodigo
 */
@WebServlet("/BuscarCodigo")
public class BuscarCodigo extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BuscarCodigo() {
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
		
		request.getSession().setAttribute("estanteriaID", request.getParameter("estanteriaID"));
		request.getSession().setAttribute("seccionID", request.getParameter("seccionID"));
//		request.getSession().setAttribute("codigoProducto", "1101");
//		request.getSession().setAttribute("bodegaID", "08");
		Connection con = null;
		CallableStatement stmt = null;
		ResultSet rs = null;
		ArrayList<DatosBusquedaCodigo> datosCodigo = new ArrayList<DatosBusquedaCodigo>();
		try{
			con = new ConectarDB().getConnection();
			stmt = con.prepareCall("{call stp_cargarProductosToma2(?,?,?)}");
			stmt.setInt(1, Integer.parseInt((String)request.getSession().getAttribute("noToma")));
			System.out.println((String)request.getSession().getAttribute("noToma"));
			stmt.setInt(2, Integer.parseInt((String)request.getSession().getAttribute("estanteriaID")));
			System.out.println((String)request.getSession().getAttribute("estanteriaID"));
			stmt.setInt(3, Integer.parseInt((String)request.getSession().getAttribute("seccionID")));
			System.out.println((String)request.getSession().getAttribute("seccionID"));
			rs = stmt.executeQuery();
			
			while(rs.next()){
				DatosBusquedaCodigo datos = new DatosBusquedaCodigo();
				datos.setCodigoProducto(rs.getString("codigo_producto"));
				datos.setDescripcion(rs.getString("descripcion_larga"));
				datos.setUnidadMedida(rs.getString("Unidad Medida"));
				datos.setCantidad(rs.getInt("conteo2"));
				datosCodigo.add(datos);
				
			}
		}catch(SQLException e){
			response.setContentType("application/json");
			response.getWriter().write(e.getMessage());
		}
		Gson gson = new Gson();
		JsonElement elemento = gson.toJsonTree(datosCodigo, new TypeToken<List<DatosBusquedaCodigo>>(){}.getType());
		JsonArray arreglo = elemento.getAsJsonArray();
		datosCodigo = null;
		response.setContentType("application/json");
		
		response.getWriter().print(arreglo);
	}

}
