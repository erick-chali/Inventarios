package com.imsa.inventario.conexion;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConectarDB {
	
	public Connection getConnection(){
		BufferedReader reader=null;
		String[] datos = new String[14];
		String[] clave = new String[2];
		String[] usuario = new String[2];
		String[] db = new String[2];
		String[] servidor = new String[2];
		String pass = "", user = "", bd = "", server = "";
		File direccion = new File("c:\\INVENTARIO\\millenium.udl");
		try {
			try {
				reader = new BufferedReader(
							new InputStreamReader(new FileInputStream(direccion), "UTF-16"));
			} catch (UnsupportedEncodingException e) {
				System.out.println(e.getMessage());
			}
		} catch (FileNotFoundException e) {
			System.out.println(e.getMessage());
		}
		while (true) {
		    String line = null;
			try {
				line = reader.readLine();
			} catch (IOException e) {
				System.out.println(e.getMessage());
			}
		    if (line == null) {
			break;
		    }
		    String[] parts = line.split(";");
		    int x = 0;
		    for (String part : parts) {
		    	datos[x] = part;
		    	x++;
		    }
		}
		
		try {
			reader.close();
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
		Connection conectar = null;
		pass = datos[1];
		user = datos[3];
		bd = datos[4];
		server = datos[5];
		clave = pass.split("=");
		usuario = user.split("=");
		db = bd.split("=");
		servidor = server.split("=");
		try {
			try {
				Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			} catch (ClassNotFoundException e) {
				System.out.println(e.getMessage());
			}
			
			String url="jdbc:sqlserver://"+(String)servidor[1]+";databaseName="+(String)db[1]+";user="+ (String)usuario[1] + ";password=" + (String)clave[1] + ";";
			
			conectar = DriverManager.getConnection(url);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return conectar;
	}
}

