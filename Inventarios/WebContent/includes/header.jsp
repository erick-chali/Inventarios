<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="img/inventario.ico">
        <title>Toma de Inventario</title>
        <link type="text/css" rel="stylesheet" href="css/bootstrap.css">
        <link type="text/css" rel="stylesheet" href="css/bootstrap-table.css">
        <link type="text/css" rel="stylesheet" href="css/style.css">
        
    </head>
    
    <body>
    <%
	//allow access only if session exists
	if(session.getAttribute("usuarioGlobal")!=null){
		String user = (String) session.getAttribute("usuarioGlobal");
		String userName = null;
		String sessionID = null;
		Cookie[] cookies = request.getCookies();
		if(cookies !=null){
			for(Cookie cookie : cookies){
			    if(cookie.getName().equals("usuarioGlobal")) userName = cookie.getValue();
			    if(cookie.getName().equals("JSESSIONID")) sessionID = cookie.getValue();
			}
		}
	}else{
		request.setAttribute("msjSesion", "Necesita iniciar sesion para poder realizar cualquier accion");
		request.getRequestDispatcher("/index.jsp").forward(request, response);
	}
	%>
    
        
        