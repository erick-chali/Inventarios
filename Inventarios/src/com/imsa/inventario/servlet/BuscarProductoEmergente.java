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
 * Servlet implementation class BuscarProductoEmergente
 */
@WebServlet("/BuscarProductoEmergente")
public class BuscarProductoEmergente extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BuscarProductoEmergente() {
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
		request.getSession().setAttribute("descripcion", request.getParameter("descripcion"));
		request.getSession().setAttribute("codigoProducto", request.getParameter("codigoProducto"));
		request.getSession().setAttribute("seccionID", request.getParameter("seccionID"));
		request.getSession().setAttribute("bodegaID", request.getParameter("bodegaID"));
		request.getSession().setAttribute("estanteriaID", request.getParameter("estanteriaID"));
		Connection con = null;
		CallableStatement stmt = null;
		ResultSet rs = null;
		ArrayList<DatosProducto> datosProducto = new ArrayList<DatosProducto>();
		int estado = 0;
		
		
		try{
			con = new ConectarDB().getConnection();
			stmt = con.prepareCall("{call stp_INV_estadoTomaNEW(?)}");
			stmt.setInt(1, Integer.parseInt((String)request.getSession().getAttribute("noToma")));
			rs = stmt.executeQuery();
			while(rs.next()){
				estado = rs.getInt("estado_toma");
			}
			con.close();
			stmt.close();
			rs.close();
			if(estado==2){
				if(((String)request.getSession().getAttribute("descripcion")).equals("") || 
					(!((String)request.getSession().getAttribute("descripcion")).equals("")&&!((String)request.getSession().getAttribute("codigoProducto")).equals(""))){
					con = new ConectarDB().getConnection();
					stmt = con.prepareCall("{call stp_CoincidenciasProductoCodigoNEW(?,?,?,?)}");
					stmt.setString(1, ((String)request.getSession().getAttribute("codigoProducto")));
					stmt.setString(2, ((String)request.getSession().getAttribute("bodegaID")));
					stmt.setInt(3, Integer.parseInt((String)request.getSession().getAttribute("estanteriaID")));
					stmt.setInt(4, Integer.parseInt((String)request.getSession().getAttribute("seccionID")));
					rs = stmt.executeQuery();
					while(rs.next()){
						DatosProducto datos = new DatosProducto();
						datos.setCodigoProducto(rs.getString("codigo_producto"));
						datos.setDescripcion(rs.getString("descripcion_larga"));
						datos.setConteo1(rs.getInt("conteo1"));
						
						Connection con2 = null;
						CallableStatement stmt2 = null;
						ResultSet rs2 = null;
						con2 = new ConectarDB().getConnection();
						stmt2 = con2.prepareCall("{call stp_INV_descripMedidaNEW(?)}");
						stmt2.setString(1, rs.getString("unidad_inventario").trim());
						rs2 = stmt2.executeQuery();
						while(rs2.next()){
							datos.setUnidadInventario(rs2.getString("descripcion"));
						}
						datosProducto.add(datos);
						stmt2.close();
						rs2.close();
						con2.close();
					}
				}else if(((String)request.getSession().getAttribute("codigoProducto")).equals("")){
					con = new ConectarDB().getConnection();
					stmt = con.prepareCall("{call stp_CoincidenciasProductoDescripcionNEW(?,?,?,?)}");
					stmt.setString(1, ((String)request.getSession().getAttribute("descripcion")));
					stmt.setString(2, ((String)request.getSession().getAttribute("bodegaID")));
					stmt.setInt(3, Integer.parseInt((String)request.getSession().getAttribute("estanteriaID")));
					stmt.setInt(4, Integer.parseInt((String)request.getSession().getAttribute("seccionID")));
					rs = stmt.executeQuery();
					while(rs.next()){
						DatosProducto datos = new DatosProducto();
						datos.setCodigoProducto(rs.getString("codigo_producto"));

						datos.setDescripcion(rs.getString("descripcion_larga"));
						datos.setConteo1(rs.getInt("conteo1"));
						
						Connection con2 = null;
						CallableStatement stmt2 = null;
						ResultSet rs2 = null;
						con2 = new ConectarDB().getConnection();
						stmt2 = con2.prepareCall("{call stp_INV_descripMedidaNEW(?)}");
						stmt2.setString(1, rs.getString("unidad_inventario").trim());
						rs2 = stmt2.executeQuery();
						while(rs2.next()){
							datos.setUnidadInventario(rs2.getString("descripcion"));
						}
						datosProducto.add(datos);
						stmt2.close();
						rs2.close();
						con2.close();
					}
				}
			}else if(estado==3){
				if(((String)request.getSession().getAttribute("descripcion")).equals("") || 
						(!((String)request.getSession().getAttribute("descripcion")).equals("")&&!((String)request.getSession().getAttribute("codigoProducto")).equals(""))){
						con = new ConectarDB().getConnection();
						stmt = con.prepareCall("{call stp_CoincidenciasProductoCodigoNEW(?,?,?,?)}");
						stmt.setString(1, ((String)request.getSession().getAttribute("codigoProducto")));
						stmt.setString(2, ((String)request.getSession().getAttribute("bodegaID")));
						stmt.setInt(3, Integer.parseInt((String)request.getSession().getAttribute("estanteriaID")));
						stmt.setInt(4, Integer.parseInt((String)request.getSession().getAttribute("seccionID")));
						rs = stmt.executeQuery();
						while(rs.next()){
							DatosProducto datos = new DatosProducto();
							datos.setCodigoProducto(rs.getString("codigo_producto"));
							datos.setDescripcion(rs.getString("descripcion_larga"));
							datos.setConteo1(rs.getInt("conteo2"));
							
							Connection con2 = null;
							CallableStatement stmt2 = null;
							ResultSet rs2 = null;
							con2 = new ConectarDB().getConnection();
							stmt2 = con2.prepareCall("{call stp_INV_descripMedidaNEW(?)}");
							stmt2.setString(1, rs.getString("unidad_inventario").trim());
							rs2 = stmt2.executeQuery();
							while(rs2.next()){
								datos.setUnidadInventario(rs2.getString("descripcion"));
							}
							datosProducto.add(datos);
							stmt2.close();
							rs2.close();
							con2.close();
						}
					}else if(((String)request.getSession().getAttribute("codigoProducto")).equals("")){
						con = new ConectarDB().getConnection();
						stmt = con.prepareCall("{call stp_CoincidenciasProductoDescripcionNEW(?,?,?,?)}");
						stmt.setString(1, ((String)request.getSession().getAttribute("descripcion")));
						stmt.setString(2, ((String)request.getSession().getAttribute("bodegaID")));
						stmt.setInt(3, Integer.parseInt((String)request.getSession().getAttribute("estanteriaID")));
						stmt.setInt(4, Integer.parseInt((String)request.getSession().getAttribute("seccionID")));
						rs = stmt.executeQuery();
						while(rs.next()){
							DatosProducto datos = new DatosProducto();
							datos.setCodigoProducto(rs.getString("codigo_producto"));
							datos.setDescripcion(rs.getString("descripcion_larga"));
							datos.setConteo1(rs.getInt("conteo2"));
							
							Connection con2 = null;
							CallableStatement stmt2 = null;
							ResultSet rs2 = null;
							con2 = new ConectarDB().getConnection();
							stmt2 = con2.prepareCall("{call stp_INV_descripMedidaNEW(?)}");
							stmt2.setString(1, rs.getString("unidad_inventario").trim());
							rs2 = stmt2.executeQuery();
							while(rs2.next()){
								datos.setUnidadInventario(rs2.getString("descripcion"));
							}
							datosProducto.add(datos);
							stmt2.close();
							rs2.close();
							con2.close();
						}
					}
			}
		}catch(SQLException e){
			response.setContentType("application/json");
			response.getWriter().write(e.getMessage());
			
		}finally{
			if(con!=null){
				try {
					con.close();
					stmt.close();
					rs.close();
				} catch (SQLException e) {
					response.setContentType("application/json");
					response.getWriter().write(e.getMessage());
				}
			}
		}
		Gson gson = new Gson();
		JsonElement elemento = gson.toJsonTree(datosProducto, new TypeToken<List<DatosProducto>>(){}.getType());
		JsonArray arreglo = elemento.getAsJsonArray();
		datosProducto = null;
		response.setContentType("application/json");
		response.getWriter().print(arreglo);
	}

}
