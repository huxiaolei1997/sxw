package web;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.jspsmart.upload.File;
import com.jspsmart.upload.SmartUpload;
import com.jspsmart.upload.SmartUploadException;

import util.DBUtil;

/**
 * Servlet implementation class UpdateExperience
 */
@WebServlet("/UpdateExperience")
public class UpdateExperience extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateExperience() {
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
		String id = request.getParameter("id");
		SmartUpload smartUpload = new SmartUpload(); // 新建一个SmartUpload对象
		ServletConfig config = this.getServletConfig();
		smartUpload.initialize(config, request, response);

		Connection conn = null;
		conn = DBUtil.getConnection();
		if (id != null) {
			try {
				PreparedStatement preparedStatement = conn.prepareStatement("select * from experience where id = ?");
				preparedStatement.setString(1, id);
				preparedStatement.executeQuery();
				ResultSet resultSet = preparedStatement.executeQuery();
				while (resultSet.next()) {
					// ServletContext application = this.getServletContext();
					HttpSession session = request.getSession();
					session.setAttribute("id", resultSet.getLong("id"));
					session.setAttribute("experTitle", resultSet.getString("experTitle"));
					session.setAttribute("content", resultSet.getString("content"));
					session.setAttribute("imageUrl", resultSet.getString("imageUrl"));
					session.setAttribute("addtime", resultSet.getTimestamp("addtime"));
					session.setAttribute("type", resultSet.getString("type"));
					response.sendRedirect(request.getContextPath() + "/test2/UpdateExperience.jsp");
					// request.getRequestDispatcher("/sxw/test2/addViewStory.jsp").forward(request,
					// response);
				}
				resultSet.close();
				preparedStatement.close();
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				throw new RuntimeException("查询失败！", e);
			}
		} else if(id == null){

			try {
				smartUpload.upload();
				String updateId = smartUpload.getRequest().getParameter("updateId");
				String experTitle = smartUpload.getRequest().getParameter("experTitle");
				String addtime = smartUpload.getRequest().getParameter("addtime");
				String imageUrl = smartUpload.getRequest().getParameter("imageUrl");
				String content = smartUpload.getRequest().getParameter("content");
				String type = smartUpload.getRequest().getParameter("type");
				Date nowTime = new Date(System.currentTimeMillis());
				SimpleDateFormat sdFormatter = new SimpleDateFormat("HH:mm:ss");
				String time = sdFormatter.format(nowTime);
				addtime = addtime + " " + time;
				if(imageUrl.length() == 0){
					SimpleDateFormat sdFormatter1 = new SimpleDateFormat("yyyyMMddHHmmss");
					String addtime1 = sdFormatter1.format(nowTime);
					File smartFile = smartUpload.getFiles().getFile(0);
					String ext = smartUpload.getFiles().getFile(0).getFileExt();
					String fileName = "experience" + addtime1 + (int) (Math.random() * 10000) + "." + ext;
					smartFile.saveAs("/upload/images/" + fileName, smartUpload.SAVE_VIRTUAL);
				    imageUrl = "/upload/images/" + fileName;
				}
				if (updateId != null) {
					PreparedStatement preparedStatement;
					try {
                        HttpSession session = request.getSession();
                        String url = (String) session.getAttribute("url");
						preparedStatement = conn.prepareStatement(
								"update  experience set experTitle = ? , content = ?,imageUrl = ?,addtime = ?,type = ? where id = ?");
						preparedStatement.setString(1, experTitle);
						preparedStatement.setString(2, content);
						preparedStatement.setString(3, imageUrl);
						preparedStatement.setTimestamp(4, Timestamp.valueOf(addtime));
						preparedStatement.setString(5, type);
						preparedStatement.setString(6, updateId);
						preparedStatement.executeUpdate();
						preparedStatement.close();
						conn.close();
						response.sendRedirect(url);
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}

				}
            
			} catch (SmartUploadException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}

		}
	}

}
