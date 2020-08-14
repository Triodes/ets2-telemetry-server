;--------------------------------
;Basic vars
  !define NAME "Telemetry Server"
  !define VERSION "4.0.6.2"
;--------------------------------
;Include Modern UI
  !include "MUI2.nsh"

;Properly display all languages (Installer will not work on Windows 95, 98 or ME!)
  Unicode true
  
; The name of the installer
  Name "${NAME}"

; The file to write
  OutFile "${NAME} Setup ${VERSION}.exe"

; The default installation directory
  InstallDir "$DOCUMENTS\${NAME}"

; Registry key to check for directory (so if you install again, it will 
; overwrite the old one automatically)
  InstallDirRegKey HKCU "Software\Telemetry Server" "Install_Dir"

; Request application privileges: user or admin
  RequestExecutionLevel admin

;--------------------------------
;Interface Settings

  !define MUI_ICON "..\server\Html\images\app-icon.ico"
  !define MUI_UNICON "..\server\Html\images\app-icon.ico"
  !define MUI_ABORTWARNING
  !define MUI_LANGDLL_ALLLANGUAGES
  !define MUI_COMPONENTSPAGE_NODESC
  
 ;Remember the installer language
  !define MUI_LANGDLL_REGISTRY_ROOT "HKCU" 
  !define MUI_LANGDLL_REGISTRY_KEY "Software\Telemetry Server" 
  !define MUI_LANGDLL_REGISTRY_VALUENAME "Installer Language"  
; Pages
  !insertmacro MUI_PAGE_WELCOME
  !insertmacro MUI_PAGE_COMPONENTS
  !insertmacro MUI_PAGE_DIRECTORY
  !insertmacro MUI_PAGE_INSTFILES
  !insertmacro MUI_PAGE_FINISH
  
  !insertmacro MUI_UNPAGE_WELCOME
  !insertmacro MUI_UNPAGE_CONFIRM
  !insertmacro MUI_UNPAGE_INSTFILES
  !insertmacro MUI_UNPAGE_FINISH

;--------------------------------
;Languages
  
  !insertmacro MUI_LANGUAGE "English"
  !insertmacro MUI_LANGUAGE "Afrikaans"
  !insertmacro MUI_LANGUAGE "Albanian"
  !insertmacro MUI_LANGUAGE "Arabic"
  !insertmacro MUI_LANGUAGE "Armenian"
  !insertmacro MUI_LANGUAGE "Asturian"
  !insertmacro MUI_LANGUAGE "Basque"
  !insertmacro MUI_LANGUAGE "Belarusian"
  !insertmacro MUI_LANGUAGE "Bosnian"
  !insertmacro MUI_LANGUAGE "Breton"
  !insertmacro MUI_LANGUAGE "Bulgarian"
  !insertmacro MUI_LANGUAGE "Catalan"
  !insertmacro MUI_LANGUAGE "Corsican"
  !insertmacro MUI_LANGUAGE "Croatian"
  !insertmacro MUI_LANGUAGE "Czech"
  !insertmacro MUI_LANGUAGE "Danish"
  !insertmacro MUI_LANGUAGE "Dutch"
  !insertmacro MUI_LANGUAGE "Esperanto"
  !insertmacro MUI_LANGUAGE "Estonian"
  !insertmacro MUI_LANGUAGE "Farsi"
  !insertmacro MUI_LANGUAGE "Finnish"
  !insertmacro MUI_LANGUAGE "French"
  !insertmacro MUI_LANGUAGE "Galician"
  !insertmacro MUI_LANGUAGE "Georgian"
  !insertmacro MUI_LANGUAGE "German"
  !insertmacro MUI_LANGUAGE "Greek"
  !insertmacro MUI_LANGUAGE "Hebrew"
  !insertmacro MUI_LANGUAGE "Hungarian"
  !insertmacro MUI_LANGUAGE "Icelandic"
  !insertmacro MUI_LANGUAGE "Indonesian"
  !insertmacro MUI_LANGUAGE "Irish"
  !insertmacro MUI_LANGUAGE "Italian"
  !insertmacro MUI_LANGUAGE "Japanese"
  !insertmacro MUI_LANGUAGE "Korean"
  !insertmacro MUI_LANGUAGE "Kurdish"
  !insertmacro MUI_LANGUAGE "Latvian"
  !insertmacro MUI_LANGUAGE "Lithuanian"
  !insertmacro MUI_LANGUAGE "Luxembourgish"
  !insertmacro MUI_LANGUAGE "Macedonian"
  !insertmacro MUI_LANGUAGE "Malay"
  !insertmacro MUI_LANGUAGE "Mongolian"
  !insertmacro MUI_LANGUAGE "Norwegian"
  !insertmacro MUI_LANGUAGE "NorwegianNynorsk"
  !insertmacro MUI_LANGUAGE "Pashto"
  !insertmacro MUI_LANGUAGE "Polish"
  !insertmacro MUI_LANGUAGE "Portuguese"
  !insertmacro MUI_LANGUAGE "PortugueseBR"
  !insertmacro MUI_LANGUAGE "Romanian"
  !insertmacro MUI_LANGUAGE "Russian"
  !insertmacro MUI_LANGUAGE "ScotsGaelic"
  !insertmacro MUI_LANGUAGE "Serbian"
  !insertmacro MUI_LANGUAGE "SerbianLatin"
  !insertmacro MUI_LANGUAGE "SimpChinese"
  !insertmacro MUI_LANGUAGE "Slovak"
  !insertmacro MUI_LANGUAGE "Slovenian"
  !insertmacro MUI_LANGUAGE "Spanish"
  !insertmacro MUI_LANGUAGE "SpanishInternational"
  !insertmacro MUI_LANGUAGE "Swedish"
  !insertmacro MUI_LANGUAGE "Tatar"
  !insertmacro MUI_LANGUAGE "Thai"
  !insertmacro MUI_LANGUAGE "TradChinese"
  !insertmacro MUI_LANGUAGE "Turkish"
  !insertmacro MUI_LANGUAGE "Ukrainian"
  !insertmacro MUI_LANGUAGE "Uzbek"
  !insertmacro MUI_LANGUAGE "Vietnamese"
  !insertmacro MUI_LANGUAGE "Welsh"

;Reserve Files
  !insertmacro MUI_RESERVEFILE_LANGDLL
  ;--------------------------------
; The main stuff to install
Section "Telemetry Server" TS

  ; Set output path to the installation directory and put files
  SetOutPath $INSTDIR
  File "..\server\*.exe"
  File "..\server\*.dll"
  File "..\server\*.config"
  SetOutPath $INSTDIR\Ets2Plugins
  File /r "..\server\Ets2Plugins\*.*"
  SetOutPath $INSTDIR\Html
  File "..\server\Html\*.*"
  SetOutPath $INSTDIR\Html\images
  File /r "..\server\Html\images\*.*"
  SetOutPath $INSTDIR\Html\scripts
  File /r "..\server\Html\scripts\*.*"
  SetOutPath $INSTDIR\Html\skins\default
  File /r "..\server\Html\skins\default\*.*"
  SetOutPath $INSTDIR\Html\skins\default-mph
  File /r "..\server\Html\skins\default-mph\*.*"
  SetOutPath $INSTDIR\Html\skins\template
  File /r "..\server\Html\skins\template\*.*"
 
  ;create shortcuts
  CreateShortCut "$DESKTOP\${NAME} ${VERSION}.lnk" "$INSTDIR\Ets2Telemetry.exe" "" "$INSTDIR\Ets2Telemetry.exe"
  CreateShortCut "$SMPROGRAMS\${NAME} ${VERSION}.lnk" "$INSTDIR\Ets2Telemetry.exe" "" "$INSTDIR\Ets2Telemetry.exe"

  ; Write the installation path into the registry
  WriteRegStr HKCU "Software\Telemetry Server" "Install_Dir" "$INSTDIR"
  WriteRegStr HKCU "Software\Telemetry Server" "Version" "${VERSION}"

  
  ; Write the uninstall keys for Windows
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Telemetry Server" "DisplayName" "${NAME}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Telemetry Server" "DisplayVersion" "${VERSION}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Telemetry Server" "DisplayIcon" "$INSTDIR\Ets2Telemetry.exe"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Telemetry Server" "Publisher" "Funbit"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Telemetry Server" "URLInfoAbout" "github.com/Funbit/ets2-telemetry-server"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Telemetry Server" "UninstallString" '"$INSTDIR\uninstall.exe"'
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Telemetry Server" "NoModify" 1
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Telemetry Server" "NoRepair" 1
  WriteUninstaller "uninstall.exe"
SectionEnd
;--------------------------------
; The optional skins to install
SectionGroup /e "Skins"
  Section "DAF XF Dashboard" Sdafxf
    SetOutPath $INSTDIR\Html\skins\daf-xf
    File /r "..\server\Html\skins\daf-xf\*.*"
  SectionEnd
  Section "Job Monitor 2" SJM2
    SetOutPath $INSTDIR\Html\skins\jobmonitor2L
    File "..\server\Html\skins\jobmonitor2L\config.json"
    File "..\server\Html\skins\jobmonitor2L\dashboard.*"
    SetOutPath $INSTDIR\Html\skins\jobmonitor2P
    File "..\server\Html\skins\jobmonitor2P\config.json"
    File "..\server\Html\skins\jobmonitor2P\dashboard.*"
  SectionEnd
  Section "MAN TGX Dashboard / KMH" Smantgx
    SetOutPath $INSTDIR\Html\skins\man-tgx
    File /r "..\server\Html\skins\man-tgx\*.*"
  SectionEnd
  Section "MAN TGX Dashboard / MPH" Smantgxmph
    SetOutPath $INSTDIR\Html\skins\man-tgx-mph
    File /r "..\server\Html\skins\man-tgx-mph\*.*"
  SectionEnd
  Section "Mercedes Benz Atego MP4 Dashboard" Smercedesatego
    SetOutPath $INSTDIR\Html\skins\mercedes-atego
    File /r "..\server\Html\skins\mercedes-atego\*.*"
  SectionEnd
  Section "Peterbilt 579 / MPH" Speterbilt579
    SetOutPath $INSTDIR\Html\skins\peterbilt579
    File /r "..\server\Html\skins\peterbilt579\*.*"
  SectionEnd
  Section "RenaultDash-Info" SRDInfo
    SetOutPath $INSTDIR\Html\skins\RD-Info
    File /r "..\server\Html\skins\RD-Info\*.*"
  SectionEnd
  Section "Scania Dashboard" SScania
    SetOutPath $INSTDIR\Html\skins\Scania
    File /r "..\server\Html\skins\Scania\*.*"
  SectionEnd
  Section "T Dashboard 4.0.1" Stdashboard4x
    SetOutPath $INSTDIR\Html\skins\t-dashboard-4x
    File /r "..\server\Html\skins\t-dashboard-4x\*.*"
  SectionEnd
  Section "Volvo FH 2012 Dashboard" Svolvofh
    SetOutPath $INSTDIR\Html\skins\volvo-fh
    File /r "..\server\Html\skins\volvo-fh\*.*"
  SectionEnd
 SectionGroupEnd
;--------------------------------
;Descriptions
/* Do I really need to add descriptions for all languages?
  LangString DESC_TS ${LANG_ENGLISH} "Main Telemetry Server files By Funbit."
  LangString DESC_Sdafxf ${LANG_ENGLISH} "By Klauzzy"
  LangString DESC_SJM2 ${LANG_ENGLISH} "By Paulo Cunha"
  LangString DESC_Smantgx ${LANG_ENGLISH} "By Klauzzy"
  LangString DESC_Smantgxmph ${LANG_ENGLISH} "By Klauzzy"
  LangString DESC_Smercedesatego ${LANG_ENGLISH} "By Klauzzy"
  LangString DESC_Speterbilt579 ${LANG_ENGLISH} "By NightstalkerPL, Lisek Chytrusek (by WEBX.PL)"
  LangString DESC_SRDInfo ${LANG_ENGLISH} "By Argiano"
  LangString DESC_SScania ${LANG_ENGLISH} "By Klauzzy"
  LangString DESC_Stdashboard4x ${LANG_ENGLISH} "By Jianqun Z. (www.jianqun.me)"
  LangString DESC_Svolvofh ${LANG_ENGLISH} "By Klauzzy"
  !insertmacro MUI_FUNCTION_DESCRIPTION_BEGIN
  !insertmacro MUI_DESCRIPTION_TEXT ${TS} $(DESC_TS)
  !insertmacro MUI_DESCRIPTION_TEXT ${Sdafxf} $(DESC_Sdafxf)
  !insertmacro MUI_DESCRIPTION_TEXT ${SJM2} $(DESC_SJM2)
  !insertmacro MUI_DESCRIPTION_TEXT ${Smantgx} $(DESC_Smantgx)
  !insertmacro MUI_DESCRIPTION_TEXT ${Smantgxmph} $(DESC_Smantgxmph)
  !insertmacro MUI_DESCRIPTION_TEXT ${Smercedesatego} $(DESC_Smercedesatego)
  !insertmacro MUI_DESCRIPTION_TEXT ${Speterbilt579} $(DESC_Speterbilt579)
  !insertmacro MUI_DESCRIPTION_TEXT ${SRDInfo} $(DESC_SRDInfo)
  !insertmacro MUI_DESCRIPTION_TEXT ${SScania} $(DESC_SScania)
  !insertmacro MUI_DESCRIPTION_TEXT ${Stdashboard4x} $(DESC_Stdashboard4x)
  !insertmacro MUI_DESCRIPTION_TEXT ${Svolvofh} $(DESC_Svolvofh)
  !insertmacro MUI_FUNCTION_DESCRIPTION_END
*/
;--------------------------------
;Installer Functions
Function .onInit
  !insertmacro MUI_LANGDLL_DISPLAY
  IntOp $0 ${SF_SELECTED} | ${SF_RO}
  SectionSetFlags ${TS} $0
FunctionEnd


;--------------------------------
; Uninstaller
Section "Uninstall"
  ; Remove registry keys
  DeleteRegKey HKCU "Software\Telemetry Server"
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurentVersion\Uninstall\Telemetry Server"
  DeleteRegKey HKLM "Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\Telemetry Server"

  ; Remove files and uninstaller
  Delete "$INSTDIR\*.*"
  Delete "$DESKTOP\${NAME} ${VERSION}.lnk"
  Delete "$SMPROGRAMS\${NAME} ${VERSION}.lnk"

  ; Remove directories used
  RMDir /r "$INSTDIR"
SectionEnd
;--------------------------------
;Uninstaller Functions
Function un.onInit
  !insertmacro MUI_UNGETLANGUAGE
FunctionEnd