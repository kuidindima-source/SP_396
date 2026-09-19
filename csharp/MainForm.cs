using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace CalculatorApp
{
    public class MainForm : Form
    {
        private WebView2 webView = null!;

        public MainForm()
        {
            InitializeComponent();
            _ = InitializeWebViewAsync();
        }

        private void InitializeComponent()
        {
            this.Text = "Расчет минимального радиуса кривой в плане (СП 396.1325800.2018)";
            this.Size = new Size(1300, 880);
            this.MinimumSize = new Size(950, 600);
            this.StartPosition = FormStartPosition.CenterScreen;
            this.BackColor = Color.FromArgb(243, 243, 243);

            webView = new WebView2
            {
                Dock = DockStyle.Fill
            };

            this.Controls.Add(webView);
        }

        private async System.Threading.Tasks.Task InitializeWebViewAsync()
        {
            try
            {
                // Путь к папке wwwroot рядом с EXE
                string exeDir = AppDomain.CurrentDomain.BaseDirectory;
                string wwwrootDir = Path.Combine(exeDir, "wwwroot");
                string indexFile = Path.Combine(wwwrootDir, "index.html");

                // Вывод отладочной информации в заголовок (временно)
                this.Text += $" [Путь: {wwwrootDir}]";

                // Локальная папка для данных пользователя
                string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
                string userDataFolder = Path.Combine(localAppData, "CalculatorApp_WebView2");

                if (!Directory.Exists(userDataFolder))
                {
                    Directory.CreateDirectory(userDataFolder);
                }

                var environment = await CoreWebView2Environment.CreateAsync(null, userDataFolder);
                
                // Подписываемся на результат инициализации ДО вызова Ensure
                webView.CoreWebView2InitializationCompleted += (sender, args) =>
                {
                    if (!args.IsSuccess)
                    {
                        MessageBox.Show($"Ошибка инициализации CoreWebView2: {args.InitializationException?.Message ?? "Неизвестная ошибка"}", "Критическая ошибка");
                        return;
                    }

                    var settings = webView.CoreWebView2.Settings;
                    settings.AreDefaultContextMenusEnabled = true;
                    settings.AreDevToolsEnabled = true;
                    settings.IsStatusBarEnabled = false;
                    settings.AreBrowserAcceleratorKeysEnabled = true; // Включаем F5 и F12
                    
                    if (Directory.Exists(wwwrootDir) && File.Exists(indexFile))
                    {
                        // Используем http вместо https для локального хоста
                        webView.CoreWebView2.SetVirtualHostNameToFolderMapping(
                            "calculator.app",
                            wwwrootDir,
                            CoreWebView2HostResourceAccessKind.Allow
                        );

                        webView.CoreWebView2.Navigate("http://calculator.app/index.html");
                    }
                    else
                    {
                        ShowErrorPage(wwwrootDir);
                    }
                };

                await webView.EnsureCoreWebView2Async(environment);

                // Перехват ошибок навигации
                webView.CoreWebView2.NavigationCompleted += (sender, args) =>
                {
                    if (!args.IsSuccess)
                    {
                        this.Text = "Ошибка загрузки: " + args.WebErrorStatus;
                    }
                    else
                    {
                        this.Text = "Расчет радиусов кривых в плане (СП 396.1325800.2018)";
                    }
                };
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Ошибка инициализации компонента WebView2:\n" + ex.Message + "\n\nСтек:\n" + ex.StackTrace,
                    "Ошибка WebView2",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
        }

        private void ShowErrorPage(string path)
        {
            webView.NavigateToString($@"
                <html style='font-family: Segoe UI, sans-serif; padding: 40px; background: #f3f3f3;'>
                    <div style='background: white; padding: 30px; border-radius: 12px; max-width: 600px; margin: 40px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1);'>
                        <h2 style='color: #d83b01; margin-top: 0;'>Файлы не найдены</h2>
                        <p>Приложение не может найти файлы интерфейса по адресу:</p>
                        <code style='display: block; background: #eee; padding: 10px; border-radius: 4px;'>{path}</code>
                        <p>Убедитесь, что папка <b>wwwroot</b> находится в той же папке, что и .exe файл.</p>
                        <hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;' />
                        <button onclick='window.location.reload()' style='background: #0078d4; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;'>Попробовать снова</button>
                    </div>
                </html>
            ");
        }
    }
}
