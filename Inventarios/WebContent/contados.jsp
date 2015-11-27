<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="com.imsa.inventario.conexion.ConectarDB"%>


<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@ include file="includes/header.jsp" %>
    	<% 
    		Connection conn = null;
    		ResultSet rs = null;
    		PreparedStatement ps = null;
    		
    		try{
    			conn = new ConectarDB().getConnection();
    			StringBuilder sb = new StringBuilder();
    			sb.append("SELECT * FROM in_productos");
    			ps = conn.prepareStatement(sb.toString());
    			rs = ps.executeQuery();
    		}catch(SQLException ex){
    			ex.printStackTrace();
    		}
    		
    	%>
        <h1>Productos Contados</h1>
        <div id="contenedorEditarFila">
        	<form action="EditaFila" method="post" class="form-inline">
        	</form>
        </div>
        <div id="contenedorContados">
            
            <table class="table table-hover" id="tablaDatos">
                <tr>
                    <th>Columna</th>
                    <th>Columna</th>
                    <th>Columna</th>
                    <th>Columna</th>
                    <th>Columna</th>
                    <th>Columna</th>
                    <th>Columna</th>
                    <th>Columna</th>
                    <th>Columna</th>
                    <th>Columna</th>
                    <th>Columna</th>
                    <th>Columna</th>
                </tr>
            <%while(rs.next()){ 
            out.print("<tr>");
            out.print("<td>" + "<a href='#'>" + rs.getString(1)+ "</a>" +"</td>");
            out.print("<td>" + rs.getString(2) + "</td>");
            out.print("<td>" + rs.getString(3) + "</td>");
            out.print("<td>" + rs.getString(4) + "</td>");
            out.print("<td>" + rs.getString(5) + "</td>");
            out.print("<td>" + rs.getString(6) + "</td>");
            out.print("<td>" + rs.getString(7) + "</td>");
            out.print("<td>" + rs.getString(8) + "</td>");
            out.print("<td>" + rs.getString(9) + "</td>");
            out.print("<td>" + rs.getString(10) + "</td>");
            out.print("<td>" + rs.getString(11) + "</td>");
            out.print("<td>" + rs.getString(12) + "</td>");
            out.print("</tr>");
            };
        	conn.close();
        	ps.close();
        	rs.close();
            %>
            </table>
        </div>
<%@ include file="includes/footer.jsp" %>