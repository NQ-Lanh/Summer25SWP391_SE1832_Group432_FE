import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Header from "../Header/Header";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TimerIcon from "@mui/icons-material/Timer";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Footer from "../Footer/Footer";
import DetailLayout from "./DetailLayout";

const BlogDetail = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <DetailLayout
        title="Phòng ngừa các bệnh thường gặp trong trường học"
        meta={
          <>
            <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
              <CalendarTodayIcon sx={{ fontSize: 20, mr: 1 }} />
              <Typography variant="body2">Ngày đăng: {new Date().toLocaleDateString("vi-VN")}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
              <TimerIcon sx={{ fontSize: 20, mr: 1 }} />
              <Typography variant="body2">8 phút đọc</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
              <PersonIcon sx={{ fontSize: 20, mr: 1 }} />
              <Typography variant="body2">Tác giả: Trường Tiểu học ABC</Typography>
            </Box>
          </>
        }
        image="/public/images/ruatay.jpg"
        imageTitle="Phòng ngừa bệnh học đường – Nền tảng cho một môi trường học tập an toàn"
        imageDesc="Hướng dẫn các biện pháp phòng tránh bệnh truyền nhiễm, giúp học sinh luôn khỏe mạnh."
      >
        {/* Đoạn mở đầu */}
        <Typography
          variant="body1"
          paragraph
          sx={{
            fontSize: "1.2rem",
            mb: 6,
            lineHeight: 1.8,
            color: "text.primary",
            textAlign: "justify",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Trường học là nơi các em học sinh vui chơi, học tập và sinh hoạt
          hằng ngày. Tuy nhiên, vì tiếp xúc gần gũi với nhau trong một môi
          trường đông người nên nguy cơ lây lan các bệnh truyền nhiễm như cảm
          cúm, tay chân miệng, sốt siêu vi, đau mắt đỏ… là điều dễ xảy ra, đặc
          biệt với trẻ nhỏ có sức đề kháng chưa cao.
        </Typography>
        {/* Bullet points (dùng MUI List) */}
        <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "#1a237e" }}>
          Một số cách phòng bệnh hiệu quả:
        </Typography>
        <List dense={false} sx={{ mb: 3, pl: 2 }}>
          <ListItem sx={{ pl: 0 }}>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Hướng dẫn các em rửa tay đúng cách bằng xà phòng, đặc biệt là trước khi ăn và sau khi đi vệ sinh." />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Giữ vệ sinh cá nhân sạch sẽ, cắt móng tay thường xuyên, mặc quần áo gọn gàng, sạch sẽ mỗi ngày." />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Không dùng chung vật dụng cá nhân như khăn mặt, bình nước, khẩu trang, muỗng, ly..." />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Ăn uống đầy đủ dưỡng chất, uống nhiều nước, ngủ đủ giấc để tăng cường sức đề kháng." />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Khi có dấu hiệu như sốt, ho, mệt mỏi, nổi ban, tiêu chảy…, phụ huynh nên cho trẻ nghỉ học và đưa đi khám bác sĩ sớm để tránh lây lan cho các bạn khác." />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Nhà trường nên đảm bảo lớp học thoáng mát, sạch sẽ, và nhắc nhở học sinh giữ gìn vệ sinh khu vực chung." />
          </ListItem>
        </List>
        {/* Trích dẫn nổi bật (blockquote) */}
        <Divider sx={{ my: 3 }} />
        <Box
          sx={{
            bgcolor: "#e3f2fd",
            borderLeft: "4px solid #1a237e",
            p: 2,
            mb: 3,
            borderRadius: 1,
          }}
        >
          <Typography variant="body1">
            "Phòng bệnh hơn chữa bệnh – hãy chủ động bảo vệ sức khỏe cho bản thân và cộng đồng!"
          </Typography>
        </Box>
      </DetailLayout>
      <Footer />
    </Box>
  );
};

export default BlogDetail;
