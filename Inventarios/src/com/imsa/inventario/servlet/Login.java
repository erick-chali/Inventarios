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
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
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
		request.getSession().setAttribute("usuario", request.getParameter("usuario"));
		request.getSession().setAttribute("clave", request.getParameter("clave"));
		request.getSession().setAttribute("noToma", request.getParameter("noToma"));
		request.getSession().setAttribute("textoToma", request.getParameter("texto"));
		Connection con = null;
		CallableStatement stmt = null;
		ResultSet rs = null;
		int respuesta =0;
		
		try {
			con = new ConectarDB().getConnection();
			stmt = con.prepareCall("{call looginSelectUser(?)}");
			stmt.setString(1, (String)request.getSession().getAttribute("usuario"));
			
			rs = stmt.executeQuery();
			while(rs.next()){
				if(rs.getString("estado_empleado").equals("A")){
						if(rs.getString("UserName").equals((String)request.getSession().getAttribute("usuario"))&&rs.getString("Password").equals((String)request.getSession().getAttribute("clave"))){
							respuesta =1;
							request.getSession().setAttribute("usuarioGlobal", rs.getString("UserName"));
							request.getSession().setAttribute("userId", rs.getString("UserID"));
							request.getSession().setAttribute("tomaGlobal", (String)request.getSession().getAttribute("noToma"));
							request.getSession().setMaxInactiveInterval(21600);
							System.out.println((String)request.getSession().getAttribute("noToma"));
							System.out.println((String)request.getSession().getAttribute("textoToma"));
						}else{
							respuesta =0;
						}
				}else{
					respuesta =2;
					System.out.println("no existe usuario");
				}
			}
			stmt.close();
			rs.close();
			con.close();
		}catch (SQLException e) {
			// TODO Auto-generated catch block
			response.setContentType("text/html");
			response.getWriter().write(e.getMessage());
		}catch (Exception e){
			response.setContentType("text/html");
			response.getWriter().write(e.getMessage());
		}
		if(respuesta == 1){
			response.setContentType("text/html");
			response.getWriter().write("1");
		}else if(respuesta == 0){
			response.setContentType("text/html");
			response.getWriter().write("0");
		}else if(respuesta ==2){
			response.setContentType("text/html");
			response.getWriter().write("2");
		}
		
	}

}
