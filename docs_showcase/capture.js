const { chromium } = require('playwright');
const path = require('path');

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });
  // Giả lập màn hình iPhone 15 Pro
  const context = await browser.newContext({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();
  const baseUrl = 'http://localhost:5000';
  const outDir = 'C:\\Users\\Song Quyen\\LuuBut_App\\docs_showcase\\screenshots';

  console.log('Navigating to app...');
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // 1. Chụp màn hình Danh bạ lưu bút (Home Screen)
  console.log('Capturing screen 1: Directory...');
  await page.screenshot({ path: path.join(outDir, '01_danh_ba_luu_but.png') });

  // 2. Chụp màn hình Chi tiết thành viên (Song Quyên)
  console.log('Capturing screen 2: Song Quyen Detail...');
  // Click vào Song Quyên
  const songQuyenCard = page.locator('text=Song Quyên').first();
  if (await songQuyenCard.isVisible()) {
    await songQuyenCard.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, '02_chi_tiet_hanh_trinh_song_quyen.png') });

    // Click nút Chỉnh sửa
    const editBtn = page.locator('text=Chỉnh sửa').first();
    if (await editBtn.isVisible()) {
      await editBtn.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(outDir, '03_man_hinh_cap_nhat_doi_viec.png') });
      // Huỷ để quay lại
      const cancelBtn = page.locator('text=Huỷ').first();
      if (await cancelBtn.isVisible()) await cancelBtn.click();
    }

    // Quay lại
    const backBtn = page.locator('text=Quay lại').first();
    if (await backBtn.isVisible()) await backBtn.click();
    await page.waitForTimeout(500);
  }

  // 3. Chụp tab Bảng tin sự kiện
  console.log('Capturing screen 4: Events...');
  const eventTab = page.locator('text=Sự Kiện Lớp').first();
  if (await eventTab.isVisible()) {
    await eventTab.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, '04_bang_tin_su_kien_hop_lop.png') });
  }

  // 4. Chụp tab Đồng bộ / Cài đặt
  console.log('Capturing screen 5: Settings...');
  const settingsTab = page.locator('text=Đồng Bộ').first();
  if (await settingsTab.isVisible()) {
    await settingsTab.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, '05_dong_bo_inapp_khong_be.png') });
  }

  console.log('Screenshots captured successfully!');
  await browser.close();
}

captureScreenshots().catch(err => {
  console.error(err);
  process.exit(1);
});
