//
//  RPENativeWrapperManager.m
//  Example
//
//  Created by Tal Kol on 08/04/2017.
//

#import "RPENativeWrapperManager.h"
#import "RPENativeWrapper.h"

@implementation RPENativeWrapperManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[RPENativeWrapper alloc] initWithBridge:self.bridge];
}

RCT_EXPORT_VIEW_PROPERTY(scrollViewHandle, NSNumber)

@end
