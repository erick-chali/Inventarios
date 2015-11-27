package com.imsa.inventario.servlet;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.imsa.inventario.conexion.ConectarDB;

/**
 * Servlet implementation class TomarConteo2
 */
@WebServlet("/TomarConteo2")
public class TomarConteo2 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TomarConteo2() {
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
		
		request.getSession().setAttribute("unidad", request.getParameter("unidad"));
		request.getSession().setAttribute("codigop", request.getParameter("codigop"));
		request.getSession().setAttribute("codigob", request.getParameter("codigob"));
		request.getSession().setAttribute("codigos", request.getParameter("codigos"));
		request.getSession().setAttribute("codigoe", request.getParameter("codigoe"));
		request.getSession().setAttribute("descrip", request.getParameter("descrip"));
		request.getSession().setAttribute("cantidad", request.getParameter("cantidad"));
		//Se declara una conexion
		Connection con = null;
		CallableStatement stmt = null;
		ResultSet rs = null;
		int estado =0;
		try{
			
			con = new ConectarDB().getConnection();//se inicia la conexion
			stmt = con.prepareCall("{call stp_INV_descripMedida(?)}");//se prepara el proceso
			stmt.setString(1, (String)request.getSession().getAttribute("unidad"));//se mandan los parametros
			rs = stmt.executeQuery();//se ejecuta el proceso.
			while(rs.next()){
				request.getSession().setAttribute("unidad", rs.getString("unidad_medida"));//si el resultado existe se hace algo aqui.
			}
			con.close();
			stmt.close();
			rs.close();
			
			con = new ConectarDB().getConnection();
			stmt = con.prepareCall("{call stp_INV_estadoToma(?)}");
			stmt.setInt(1, Integer.parseInt((String)request.getSession().getAttribute("noToma")));
			rs = stmt.executeQuery();
			
			while(rs.next()){
				estado = rs.getInt("estado_toma");
			}
			con.close();
			stmt.close();
			rs.close();
			if(estado==2){
				con = new ConectarDB().getConnection();
				stmt = con.prepareCall("{call stp_UDinActualizaProducto(?,?,?,?,?,?)}");
				stmt.setInt(1, Integer.parseInt((String)request.getSession().getAttribute("noToma")));
//				stmt.setString(2, (String)request.getSession().getAttribute("codigob"));
				stmt.setString(3, (String)request.getSession().getAttribute("codigop"));
//				stmt.setString(4, (String)request.getSession().getAttribute("unidad"));
				stmt.setDouble(5, Double.parseDouble((String)request.getSession().getAttribute("cantidad")));
//				stmt.setString(6, null);
				stmt.setInt(7, Integer.parseInt((String)request.getSession().getAttribute("codigos")));
				stmt.setInt(8, Integer.parseInt((String)request.getSession().getAttribute("codigoe")));
				stmt.setInt(9, Integer.parseInt((String)request.getSession().getAttribute("userId")));
				rs = stmt.executeQuery();
				
				while (rs.next()){
					if(rs.getInt("dato")==1){
						response.setContentType("text/html");
						response.getWriter().write("PRODUCTO CONTADO TOMA 2: " + (String)request.getSession().getAttribute("codigop"));
					}
					
				}
				stmt.close();
				rs.close();
				con.close();
			}else if(estado == 3){
				con = new ConectarDB().getConnection();
				stmt = con.prepareCall("{call stp_UDinActualizaProducto2NEW(?,?,?,?,?,?)}");
				stmt.setInt(1, Integer.parseInt((String)request.getSession().getAttribute("noToma")));
//				stmt.setString(2, (String)request.getSession().getAttribute("codigoBodega"));
				stmt.setString(3, (String)request.getSession().getAttribute("codigop"));
//				stmt.setString(4, (String)request.getSession().getAttribute("unidad"));
				stmt.setDouble(5, Double.parseDouble((String)request.getSession().getAttribute("cantidad")));
//				stmt.setString(6, null);
				stmt.setInt(7, Integer.parseInt((String)request.getSession().getAttribute("codigos")));
				stmt.setInt(8, Integer.parseInt((String)request.getSession().getAttribute("codigoe")));
				stmt.setInt(9, Integer.parseInt((String)request.getSession().getAttribute("userId")));
				rs = stmt.executeQuery();
				
				while (rs.next()){
					if(rs.getInt("dato")==1){
						response.setContentType("text/html");
						response.getWriter().write("PRODUCTO CONTEO2: " + (String)request.getSession().getAttribute("codigop") + " CANTIDAD: " + (String)request.getSession().getAttribute("cantidad"));
					}
					
				}
				stmt.close();
				rs.close();
				con.close();
			}
		}catch(SQLException e){
			/**Exepciones de tipo sql:
			 * -errores declarados en el proceso.
			 * -errores de conversion de tipos de sql.
			 * 
			 * **/
			response.setContentType("text/html");
			response.getWriter().write(e.getMessage());
		}catch(Exception e){
			/**Errores de conexion
			 * **/
			response.setContentType("text/html");
			response.getWriter().write(e.getMessage());
		}finally{
			if(con!=null){/**SI POR ALGUNA RAZON NOSE CIERRAN LAS CONEXIONES A LA DB**/
				try {
					con.close();
					stmt.close();
					rs.close();
				} catch (SQLException e) {
					response.setContentType("text/html");
					response.getWriter().write(e.getMessage());
				}
			}
		}
	}

}
