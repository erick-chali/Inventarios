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
import com.imsa.inventario.datos.DatosErroresPersonalizados;
import com.imsa.inventario.datos.DatosProductosAuditor;

/**
 * Servlet implementation class CargarProductosAuditor
 */
@WebServlet("/CargarProductosAuditor")
public class CargarProductosAuditor extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CargarProductosAuditor() {
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
		ArrayList<DatosProductosAuditor> productosPorUsuario = new ArrayList<DatosProductosAuditor>();
		ArrayList<DatosErroresPersonalizados> datosErrores = new ArrayList<DatosErroresPersonalizados>();
		int estado=0;
		try{
			con = new ConectarDB().getConnection();
			stmt = con.prepareCall("{call stp_INV_estadoTomaNEW(?)}");
			stmt.setInt(1, Integer.parseInt((String)request.getSession().getAttribute("noToma")));
			rs = stmt.executeQuery();
			
			while(rs.next()){
				estado = rs.getInt("estado_toma");
			}
			stmt.close();
			rs.close();
			con.close();
			
			
			con = new ConectarDB().getConnection();
			stmt = con.prepareCall("{call stp_INV_cargarProductosAuditorNEW(?)}");
			stmt.setInt(1, Integer.parseInt((String)request.getSession().getAttribute("noToma")));
			rs = stmt.executeQuery();
			while(rs.next()){
				if(estado==2){
					DatosProductosAuditor datos = new DatosProductosAuditor();
					datos.setNoToma(rs.getInt("no_toma"));
					datos.setCodigoProducto(rs.getString("codigo_producto"));
					datos.setDescripcion(rs.getString("descripcion_larga"));
					datos.setBodegaID(rs.getString("codigo_bodega"));
					datos.setConteo1(rs.getInt("conteo1"));
					datos.setConteo2(rs.getInt("conteo2"));
					datos.setEstanteriaID(rs.getInt("estanteria_ID"));
					datos.setSeccionID(rs.getInt("seccion_ID"));
					datos.setSeccion(rs.getString("seccion"));
					datos.setEstanteria(rs.getString("estanteria"));
					datos.setBodega(rs.getString("bodega"));
					datos.setUnidad(rs.getString("unidad"));
					datos.setUsuarioID(rs.getInt("usuarioId"));
					datos.setUsername(rs.getString("UserName"));
					datos.setNombre(rs.getString("nombre"));
					productosPorUsuario.add(datos);
				}else if(estado==3){
					DatosProductosAuditor datos = new DatosProductosAuditor();
					datos.setNoToma(rs.getInt("no_toma"));
					datos.setCodigoProducto(rs.getString("codigo_producto"));
					datos.setDescripcion(rs.getString("descripcion_larga"));
					datos.setBodegaID(rs.getString("codigo_bodega"));
					datos.setConteo1(rs.getInt("conteo1"));
					datos.setConteo2(rs.getInt("conteo2"));
					datos.setEstanteriaID(rs.getInt("estanteria_ID"));
					datos.setSeccionID(rs.getInt("seccion_ID"));
					datos.setSeccion(rs.getString("seccion"));
					datos.setEstanteria(rs.getString("estanteria"));
					datos.setBodega(rs.getString("bodega"));
					datos.setUnidad(rs.getString("unidad"));
					datos.setUsuarioID(rs.getInt("usuarioId"));
					datos.setUsername(rs.getString("UserName"));
					datos.setNombre(rs.getString("nombre"));
					productosPorUsuario.add(datos);
				}else{
					DatosErroresPersonalizados datos = new DatosErroresPersonalizados();
					datos.setMensaje("La toma no tiene estado 2 o 3 asignado.");
					datosErrores.add(datos);
					
					Gson gson = new Gson();
					JsonElement elemento = gson.toJsonTree(datosErrores, new TypeToken<List<DatosErroresPersonalizados>>(){}.getType());
					JsonArray arreglo = elemento.getAsJsonArray();
					datos = null;
					response.setContentType("application/json");
					response.getWriter().print(arreglo);
				}
				
			}
		}catch(SQLException e){
			response.setContentType("application/json");
			response.getWriter().print(e.getMessage());
		}catch(Exception e){
			response.setContentType("application/json");
			response.getWriter().print(e.getClass());
		}
		Gson gson = new Gson();
		JsonElement elemento = gson.toJsonTree(productosPorUsuario, new TypeToken<List<DatosProductosAuditor>>(){}.getType());
		JsonArray arreglo = elemento.getAsJsonArray();
		response.setContentType("application/json");
		response.getWriter().print(arreglo);
	}

}
