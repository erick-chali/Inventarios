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
import com.imsa.inventario.datos.DatosProducto;

/**
 * Servlet implementation class BuscarProducto
 */
@WebServlet("/BuscarProducto")
public class BuscarProducto extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BuscarProducto() {
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
		request.getSession().setAttribute("codigoProducto", request.getParameter("codigoProducto"));
		System.out.println((String)request.getSession().getAttribute("codigoProducto"));
		request.getSession().setAttribute("seccionID", request.getParameter("seccionID"));
		request.getSession().setAttribute("bodegaID", request.getParameter("bodegaID"));
		request.getSession().setAttribute("estanteriaID", request.getParameter("estanteriaID"));
		Connection con = null;
		CallableStatement stmt = null;
		ResultSet rs = null;
		ArrayList<DatosProducto> datosProducto = new ArrayList<DatosProducto>();
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
			stmt = con.prepareCall("{call stp_ProductoAutoCompletacionNEW(?,?,?,?,?)}");
			stmt.setString(1, (String)request.getSession().getAttribute("codigoProducto"));
			stmt.setString(2, (String)request.getSession().getAttribute("estanteriaID"));
			stmt.setString(3, (String)request.getSession().getAttribute("seccionID"));
			stmt.setString(4, (String)request.getSession().getAttribute("codigoBodega"));
			stmt.setInt(5, Integer.parseInt((String)request.getSession().getAttribute("noToma")));
			rs = stmt.executeQuery();
			while(rs.next()){
				DatosProducto datos = new DatosProducto();
				datos.setCodigoProducto(rs.getString("codigo_producto"));
				datos.setDescripcion(rs.getString("descripcion").trim());
				datos.setConteo1(rs.getInt("conteo1"));
				datos.setConteo2(rs.getInt("conteo2"));
				datos.setUnidadInventario(rs.getString("Medida"));
//				Connection con2 = null;
//				CallableStatement stmt2 = null;
//				ResultSet rs2 = null;
//				con2 = new ConectarDB().getConnection();
//				stmt2 = con2.prepareCall("{call stp_INV_descripMedida(?)}");
//				stmt2.setString(1, rs.getString("Medida").trim());
//				rs2 = stmt2.executeQuery();
//				while(rs2.next()){
//					datos.setUnidadInventario(rs2.getString("descripcion"));
//				}
//				stmt2.close();
//				rs2.close();
//				con2.close();
				
				datosProducto.add(datos);
			}
			stmt.close();
			rs.close();
			con.close();
		}catch(SQLException e){
			response.setContentType("application/json");
			response.getWriter().write(e.getMessage());
		}catch(Exception ex){
			response.setContentType("application/json");
			response.getWriter().write(ex.getMessage());
		}
		
		Gson gson = new Gson();
		JsonElement elemento = gson.toJsonTree(datosProducto, new TypeToken<List<DatosProducto>>(){}.getType());
		JsonArray arreglo = elemento.getAsJsonArray();
		datosProducto = null;
		response.setContentType("application/json");
		
		response.getWriter().print(arreglo);
	}

}
