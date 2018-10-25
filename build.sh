ionic cordova build ios
xcodebuild \
    -workspace "platforms/ios/Mobile Examiner.xcworkspace" \
    -scheme "Mobile Examiner" \
    -configuration "Release" \
    -sdk iphoneos \
    -archivePath "platforms/ios/Mobile Examiner.xcarchive" \
    CODE_SIGN_IDENTITY="" \
    CODE_SIGNING_REQUIRED=NO \
    clean archive
